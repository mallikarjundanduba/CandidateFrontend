import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8085';
const WS_URL = `${API_BASE_URL.replace('http', 'ws')}/ws`;

class WebSocketService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.subscriptions = new Map(); // Store subscriptions by candidateId
    this.callbacks = new Map(); // Store callbacks for notifications
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 3000; // 3 seconds
  }

  /**
   * Connect to WebSocket server
   * @param {string} candidateId - Candidate ID for subscription
   * @param {Function} onNotification - Callback when notification is received
   */
  connect(candidateId, onNotification) {
    if (this.isConnected && this.client && this.client.active) {
      console.log('WebSocket already connected');
      this.subscribe(candidateId, onNotification);
      return;
    }

    console.log('Connecting to WebSocket server:', WS_URL);
    
    const socket = new SockJS(`${API_BASE_URL}/ws`);
    this.client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: this.reconnectDelay,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame) => {
        console.log('WebSocket connected:', frame);
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.subscribe(candidateId, onNotification);
      },
      onStompError: (frame) => {
        console.error('WebSocket STOMP error:', frame);
        this.isConnected = false;
        this.handleReconnect(candidateId, onNotification);
      },
      onWebSocketClose: () => {
        console.log('WebSocket connection closed');
        this.isConnected = false;
        this.handleReconnect(candidateId, onNotification);
      },
      onWebSocketError: (error) => {
        console.error('WebSocket error:', error);
        this.isConnected = false;
        this.handleReconnect(candidateId, onNotification);
      },
      debug: (str) => {
        // Disable verbose logging in production
        if (process.env.NODE_ENV === 'development') {
          console.log('STOMP:', str);
        }
      }
    });

    this.client.activate();
  }

  /**
   * Subscribe to candidate's notification topic
   * @param {string} candidateId - Candidate ID
   * @param {Function} onNotification - Callback when notification is received
   */
  subscribe(candidateId, onNotification) {
    if (!this.client || !this.client.active) {
      console.warn('WebSocket client not active, cannot subscribe');
      return;
    }

    // Store callback
    if (onNotification) {
      this.callbacks.set(candidateId, onNotification);
    }

    // Unsubscribe from previous subscription if exists
    if (this.subscriptions.has(candidateId)) {
      const subscription = this.subscriptions.get(candidateId);
      subscription.unsubscribe();
      this.subscriptions.delete(candidateId);
    }

    // Subscribe to candidate's notification topic
    const topic = `/topic/notifications/${candidateId}`;
    console.log(`Subscribing to WebSocket topic: ${topic}`);
    const subscription = this.client.subscribe(topic, (message) => {
      try {
        const notification = JSON.parse(message.body);
        console.log('✅ Received notification via WebSocket:', notification);
        console.log('Notification details:', {
          id: notification.id,
          title: notification.title,
          message: notification.message,
          type: notification.type
        });
        
        // Call callback if provided
        const callback = this.callbacks.get(candidateId);
        if (callback && typeof callback === 'function') {
          console.log('Calling notification callback...');
          callback(notification);
        } else {
          console.warn('No callback registered for candidate:', candidateId);
        }
      } catch (error) {
        console.error('❌ Error parsing WebSocket notification:', error);
        console.error('Raw message body:', message.body);
      }
    });

    this.subscriptions.set(candidateId, subscription);
    console.log(`Subscribed to notifications for candidate: ${candidateId}`);
  }

  /**
   * Unsubscribe from candidate's notification topic
   * @param {string} candidateId - Candidate ID
   */
  unsubscribe(candidateId) {
    if (this.subscriptions.has(candidateId)) {
      const subscription = this.subscriptions.get(candidateId);
      subscription.unsubscribe();
      this.subscriptions.delete(candidateId);
      this.callbacks.delete(candidateId);
      console.log(`Unsubscribed from notifications for candidate: ${candidateId}`);
    }
  }

  /**
   * Disconnect WebSocket
   */
  disconnect() {
    // Unsubscribe from all topics
    this.subscriptions.forEach((subscription, candidateId) => {
      subscription.unsubscribe();
      console.log(`Unsubscribed from notifications for candidate: ${candidateId}`);
    });
    this.subscriptions.clear();
    this.callbacks.clear();

    // Deactivate client
    if (this.client && this.client.active) {
      this.client.deactivate();
      console.log('WebSocket disconnected');
    }
    this.isConnected = false;
    this.reconnectAttempts = 0;
  }

  /**
   * Handle reconnection logic
   * @param {string} candidateId - Candidate ID
   * @param {Function} onNotification - Callback when notification is received
   */
  handleReconnect(candidateId, onNotification) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached. WebSocket connection failed.');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * this.reconnectAttempts; // Exponential backoff
    
    console.log(`Attempting to reconnect WebSocket (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms...`);
    
    setTimeout(() => {
      if (!this.isConnected) {
        this.connect(candidateId, onNotification);
      }
    }, delay);
  }

  /**
   * Check if WebSocket is connected
   * @returns {boolean}
   */
  getConnectionStatus() {
    return this.isConnected && this.client && this.client.active;
  }
}

// Export singleton instance
export const websocketService = new WebSocketService();
export default websocketService;
