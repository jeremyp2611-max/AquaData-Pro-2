
import React from 'react';
import { SECTORES } from '../constants';

interface ControlPanelProps {
    sector: string;
    onSectorChange: (value: string) => void;
    biomass: number;
    onBiomassChange: (value: number) => void;
    price: number;
    onPriceChange: (value: number) => void;
    coordinates: { lat: number; lon: number };
}

const InputGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
        {children}
    </div>
);

export const ControlPanel: React.FC<ControlPanelProps> = ({
    sector,
    onSectorChange,
    biomass,
    onBiomassChange,
    price,
    onPriceChange,
    coordinates
}) => {
    return (
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-white">🦐 Parámetros de la Piscina</h2>
            <InputGroup label="Sector de Cultivo">
                <select
                    value={sector}
                    onChange={(e) => onSectorChange(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                    {Object.keys(SECTORES).map(key => (
                        <option key={key} value={key}>{key}</option>
                    ))}
                </select>
            </InputGroup>

            <InputGroup label="Biomasa Estimada (kg)">
                <input
                    type="number"
                    value={biomass}
                    onChange={(e) => onBiomassChange(parseFloat(e.target.value))}
                    min="100"
                    step="100"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
            </InputGroup>

            <InputGroup label="Precio del Saco ($)">
                 <input
                    type="number"
                    value={price}
                    onChange={(e) => onPriceChange(parseFloat(e.target.value))}
                    min="10"
                    step="0.5"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
            </InputGroup>
            
            <div className="text-center text-xs text-gray-500 pt-2 border-t border-slate-700/50">
                Lat: {coordinates.lat.toFixed(2)} | Lon: {coordinates.lon.toFixed(2)}
            </div>
        </div>
    );
};
