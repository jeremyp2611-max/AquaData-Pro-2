
import React from 'react';
import type { ShrimpStatus } from '../types';
import { PillIcon, SyringeIcon, TestTubeIcon, AlertTriangleIcon } from './icons';

interface SolutionsPanelProps {
    status: ShrimpStatus;
}

const solutions: Record<string, { title: string; icon: React.ReactNode; message: string; action: string; }> = {
    cold: {
        title: 'Bioseguridad',
        icon: <SyringeIcon className="w-5 h-5" />,
        message: 'El camarón está inmunodeprimido.',
        action: 'Reducir alimentación al mínimo. Activar aireación intermitente entre 3:00 y 5:00 AM para evitar hipoxia.'
    },
    suffocating: {
        title: 'Mortalidad',
        icon: <AlertTriangleIcon className="w-5 h-5" />,
        message: 'El camarón está asfixiándose.',
        action: 'Encender TODOS los aireadores inmediatamente. Suspender alimentación hasta que el O₂ se normalice.'
    },
    stressed: {
        title: 'Química',
        icon: <TestTubeIcon className="w-5 h-5" />,
        message: 'La calidad del agua está desequilibrada.',
        action: 'Iniciar recambio de agua o aplicar alcalinizantes. Consultar niveles de amonio.'
    }
};

export const SolutionsPanel: React.FC<SolutionsPanelProps> = ({ status }) => {
    if (status.code === 'healthy') {
        return null;
    }

    const solution = solutions[status.code];
    if (!solution) {
        return null;
    }

    return (
        <div className="border border-amber-600/50 bg-amber-900/30 rounded-2xl p-4 md:p-6">
            <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2">
                <AlertTriangleIcon className="w-6 h-6" /> Panel de Soluciones para {status.title}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4 flex items-start gap-3">
                    <span className="text-red-400 mt-1">{solution.icon}</span>
                    <div>
                        <h4 className="font-semibold text-red-300">{solution.title}</h4>
                        <p className="text-sm text-red-300/80">{solution.message}</p>
                    </div>
                </div>
                <div className="bg-amber-900/30 border border-amber-700/50 rounded-xl p-4 flex items-start gap-3">
                     <span className="text-amber-400 mt-1"><PillIcon className="w-5 h-5" /></span>
                    <div>
                        <h4 className="font-semibold text-amber-300">Acción Recomendada</h4>
                        <p className="text-sm text-amber-300/80">{solution.action}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
