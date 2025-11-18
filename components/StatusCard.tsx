
import React from 'react';
import type { ShrimpStatus } from '../types';

interface StatusCardProps {
    status: ShrimpStatus;
}

const statusColorClasses: Record<string, string> = {
    healthy: 'text-emerald-400 border-emerald-500/30',
    cold: 'text-blue-400 border-blue-500/30',
    stressed: 'text-amber-400 border-amber-500/30',
    suffocating: 'text-red-400 border-red-500/30',
};

export const StatusCard: React.FC<StatusCardProps> = ({ status }) => {
    const colorClass = statusColorClasses[status.code] || 'text-gray-400 border-gray-500/30';

    return (
        <div className={`bg-gradient-to-br from-slate-900/60 to-slate-900/40 backdrop-blur-xl border ${colorClass} rounded-2xl p-8 text-center flex-grow flex flex-col justify-center items-center`}>
            <div className="floating-shrimp text-8xl" style={{ filter: `drop-shadow(0 0 25px ${status.color}60)` }}>
                {status.emoji}
            </div>
            <h2 className={`text-4xl font-bold mt-4 mb-2 ${colorClass}`}>{status.title}</h2>
            <p className="text-lg text-gray-300">{status.description}</p>
        </div>
    );
};
