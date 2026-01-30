import React, { useState } from 'react';
import { Send, Building2, Globe, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ADMIN_BACKEND_URL } from '../../constants/api';

const Support = () => {
    const [target, setTarget] = useState('INTERNAL'); // INTERNAL or EXTERNAL
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const token = localStorage.getItem('token');
            console.log("Logged in user:", user);
            console.log("Submitting ticket with email:", user.email);

            const payload = {
                userType: 'CANDIDATE',
                name: user.name || 'Candidate',
                email: user.email || 'anonymous@kareergrowth.com',
                organizationId: user.organizationId,
                target,
                subject,
                message,
                type: 'ISSUE'
            };
            console.log("Payload:", payload);

            const response = await fetch(`${ADMIN_BACKEND_URL}/api/support/tickets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Failed to submit ticket');
            }

            setStatus({ type: 'success', message: 'Support ticket submitted successfully! We will contact you shortly.' });
            setSubject('');
            setMessage('');
        } catch (error) {
            console.error('Error submitting ticket:', error);
            setStatus({ type: 'error', message: 'Failed to submit ticket. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 mx-auto animate-fade-in space-y-4 pb-10">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight">Support & Help 🤝</h1>
                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
                    Need assistance? Reach out to the right team for help
                </p>
            </div>

            {/* Target Selection Cards */}
            <div className="grid md:grid-cols-2 gap-6">
                <button
                    className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 group ${target === 'INTERNAL'
                        ? 'border-[#3631A4] bg-[#3631A4]/5 shadow-lg shadow-[#3631A4]/10'
                        : 'border-transparent bg-white shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:border-gray-200'
                        }`}
                    onClick={() => setTarget('INTERNAL')}
                >
                    <div className="flex flex-row items-start gap-5">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${target === 'INTERNAL' ? 'bg-[#3631A4] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                            }`}>
                            <Building2 size={28} />
                        </div>
                        <div className="flex-1">
                            <h3 className={`text-lg font-bold mb-1 ${target === 'INTERNAL' ? 'text-[#3631A4]' : 'text-gray-900'}`}>
                                Contact Organization
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                For issues related to your college, placements, or internal schedules.
                            </p>
                        </div>
                    </div>
                    {target === 'INTERNAL' && (
                        <div className="absolute top-4 right-4 text-[#3631A4]">
                            <CheckCircle2 size={24} />
                        </div>
                    )}
                </button>

                <button
                    className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 group ${target === 'EXTERNAL'
                        ? 'border-[#3631A4] bg-[#3631A4]/5 shadow-lg shadow-[#3631A4]/10'
                        : 'border-transparent bg-white shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:border-gray-200'
                        }`}
                    onClick={() => setTarget('EXTERNAL')}
                >
                    <div className="flex flex-row items-start gap-5">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${target === 'EXTERNAL' ? 'bg-[#3631A4] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                            }`}>
                            <Globe size={28} />
                        </div>
                        <div className="flex-1">
                            <h3 className={`text-lg font-bold mb-1 ${target === 'EXTERNAL' ? 'text-[#3631A4]' : 'text-gray-900'}`}>
                                Contact Platform Support
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                For technical issues, bugs, or account access problems on KareerGrowth.
                            </p>
                        </div>
                    </div>
                    {target === 'EXTERNAL' && (
                        <div className="absolute top-4 right-4 text-[#3631A4]">
                            <CheckCircle2 size={24} />
                        </div>
                    )}
                </button>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)]">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Send a Message to {target === 'INTERNAL' ? 'Organization Admin' : 'Platform Support'}
                </h2>

                {status.message && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                        {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                        <p className="font-medium">{status.message}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3631A4] focus:ring-2 focus:ring-[#3631A4]/10 outline-none transition-all placeholder:text-gray-400"
                            placeholder="Briefly describe your issue..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3631A4] focus:ring-2 focus:ring-[#3631A4]/10 outline-none transition-all min-h-[150px] placeholder:text-gray-400 resize-none"
                            placeholder="Provide more details about your request..."
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-8 py-3 rounded-xl bg-[#3631A4] text-white font-semibold shadow-lg shadow-[#3631A4]/20 hover:bg-[#2c288a] active:scale-95 transition-all flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? (
                                <>Processing...</>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Send Message
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Support;
