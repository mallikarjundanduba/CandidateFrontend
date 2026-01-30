import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import websocketService from '../services/websocketService';
import { getCandidateData } from '../utils/candidateUtils';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children, onNotification }) => {
  const [isConnected, setIsConnected] = useState(false);
  const candidateIdRef = useRef(null);

  useEffect(() => {
    // Get candidate data from localStorage
    const candidateData = getCandidateData();
    const candidateId = candidateData?.id;

    if (!candidateId) {
      console.log('No candidate ID found, skipping WebSocket connection');
      return;
    }

    candidateIdRef.current = candidateId;

    // Connect WebSocket with notification callback
    const handleNotification = (notification) => {
      console.log('WebSocket notification received:', notification);
      if (onNotification && typeof onNotification === 'function') {
        onNotification(notification);
      }
    };

    console.log('Connecting WebSocket for candidate:', candidateId);
    websocketService.connect(candidateId, handleNotification);

    // Check connection status periodically
    const statusInterval = setInterval(() => {
      const connected = websocketService.getConnectionStatus();
      setIsConnected(connected);
    }, 1000);

    // Cleanup on unmount
    return () => {
      clearInterval(statusInterval);
      websocketService.disconnect();
    };
  }, [onNotification]);

  // Reconnect if candidate ID changes
  useEffect(() => {
    const candidateData = getCandidateData();
    const candidateId = candidateData?.id;

    if (candidateId && candidateId !== candidateIdRef.current) {
      console.log('Candidate ID changed, reconnecting WebSocket:', candidateId);
      websocketService.disconnect();
      candidateIdRef.current = candidateId;
      
      const handleNotification = (notification) => {
        if (onNotification && typeof onNotification === 'function') {
          onNotification(notification);
        }
      };
      
      websocketService.connect(candidateId, handleNotification);
    }
  }, [onNotification]);

  return (
    <WebSocketContext.Provider value={{ isConnected, websocketService }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within WebSocketProvider');
  }
  return context;
};
