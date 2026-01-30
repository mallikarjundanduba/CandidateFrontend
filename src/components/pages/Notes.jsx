import React from "react";
import { StickyNote } from "lucide-react";

const Notes = () => {
    return (
        <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 mx-auto animate-fade-in space-y-4 pb-10 relative">
            {/* Header - Premium Dashboard Style */}
            <div>
                <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight uppercase">My Notes 📝</h1>
                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
                    Keep track of your learning and interview preparation
                </p>
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-[24px] shadow-[0_0_20px_rgba(0,0,0,0.08)] p-16 border border-gray-50">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6 text-[#4C4CFF]">
                        <StickyNote size={40} />
                    </div>
                    <h3 className="text-sm font-black text-[#1a1a1a] uppercase tracking-tight mb-2">No notes yet</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest max-w-[280px] leading-relaxed">
                        Capture important snippets, interview questions, or study reminders here.
                    </p>
                </div>
            </div>

            {/* Background Tech Pattern */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#4C4CFF 0.5px, transparent 0.5px), radial-gradient(#4C4CFF 0.5px, #f8f9fd 0.5px)', backgroundSize: '20px 20px' }}>
            </div>
        </div>
    );
};

export default Notes;
