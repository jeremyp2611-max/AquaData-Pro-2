
import React from 'react';

export const ReportAccordion: React.FC = () => {
    return (
        <details className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 md:p-6 cursor-pointer group">
            <summary className="text-lg font-semibold text-white list-none flex justify-between items-center">
                📚 Ver Reporte Científico: Vulnerabilidad por Frío
                <span className="transition-transform duration-300 group-open:rotate-90">&gt;</span>
            </summary>
            <div className="mt-4 pt-4 border-t border-slate-700/50 prose prose-invert prose-sm max-w-none text-gray-300">
                <h2 className="text-white">REPORTE DE INTELIGENCIA: Vulnerabilidad del Camarón (Penaeus vannamei)</h2>
                <p>
                    El <em>Penaeus vannamei</em> (camarón blanco) es un animal tropical <strong>poiquilotermo</strong>. Su metabolismo depende 100% de la temperatura ambiente.
                </p>
                <h3>1. Zona Óptima (26°C - 30°C)</h3>
                <ul>
                    <li><strong>Metabolismo:</strong> Activo. El camarón come vigorosamente (Tasa base del 3%).</li>
                    <li><strong>Sistema Inmune:</strong> Fuerte.</li>
                </ul>
                <h3>2. Zona de Peligro (&lt; 24°C)</h3>
                <ul>
                    <li><strong>Metabolismo:</strong> <strong>Parada casi total de alimentación (Anorexia)</strong>. El camarón deja de comer.</li>
                    <li><strong>Sistema Inmune:</strong> <strong>Falla Crítica.</strong> Esto es el disparador de enfermedades como el WSSV (Mancha Blanca) y Vibriosis.</li>
                    <li><strong>Justificación de Ahorro:</strong> Al alimentar de más en esta etapa (3% cuando solo come 0.5%), se desperdicia balanceado y se contamina el agua, incrementando el riesgo de enfermedad.</li>
                </ul>
                <p className="font-semibold text-white">
                    El algoritmo calcula el ahorro precisamente en esta brecha: el valor que la biología le resta a la alimentación por rutina.
                </p>
            </div>
        </details>
    );
};
