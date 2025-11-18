
import React from 'react';

interface KpiCardProps {
    title: string;
    value: string;
    delta?: string;
    deltaLabel?: string;
    deltaColor?: 'emerald' | 'red' | 'normal';
}

export const KpiCard: React.FC<KpiCardProps> = ({ title, value, delta, deltaLabel, deltaColor = 'normal' }) => {
    const deltaColorClass = {
        emerald: 'text-emerald-400',
        red: 'text-red-400',
        normal: 'text-gray-400'
    }[deltaColor];

    return (
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 flex flex-col justify-between h-full transition-all duration-300 hover:border-slate-500 hover:bg-slate-900">
            <h4 className="text-sm font-medium text-gray-400 mb-2">{title}</h4>
            <p className="text-2xl md:text-3xl font-bold text-white">{value}</p>
            {delta && (
                <div className="text-xs mt-2">
                    <span className={`${deltaColorClass} font-semibold`}>{delta}</span>
                    {deltaLabel && <span className="text-gray-500 ml-1">{deltaLabel}</span>}
                </div>
            )}
        </div>
    );
};
