
import React from 'react';
import type { ShrimpStatus } from '../types';

interface BottomStatusBarProps {
    status: ShrimpStatus;
    savings: number;
}

const statusBgColors: Record<string, string> = {
    healthy: 'bg-emerald-500',
    cold: 'bg-blue-500',
    stressed: 'bg-amber-500',
    suffocating: 'bg-red-500',
};


export const BottomStatusBar: React.FC<BottomStatusBarProps> = ({ status, savings }) => {
    const bgColorClass = statusBgColors[status.code] || 'bg-gray-500';

    return (
        <div className={`fixed bottom-0 left-0 right-0 h-14 ${bgColorClass} text-white flex items-center justify-center shadow-2xl shadow-black z-50`}>
            <div className="flex items-center justify-center text-center font-bold text-base md:text-lg gap-2 md:gap-4 px-4">
                <span>{status.title}</span>
                <span className="hidden md:inline">|</span>
                <span>Ahorro Potencial Diario: ${savings.toFixed(2)} USD</span>
            </div>
        </div>
    );
};
