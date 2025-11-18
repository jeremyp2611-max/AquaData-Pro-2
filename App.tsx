
import React, { useState, useMemo, useCallback } from 'react';
import { SECTORES } from './constants';
import type { ShrimpStatus, HistoricalDataPoint } from './types';
import { calcularAhorro, obtenerEstadoCamaron, obtenerDatosHistoricos, obtenerTempReal } from './lib/utils';
import { ControlPanel } from './components/ControlPanel';
import { StatusCard } from './components/StatusCard';
import { KpiCard } from './components/KpiCard';
import { SolutionsPanel } from './components/SolutionsPanel';
import { TrendChart } from './components/TrendChart';
import { ReportAccordion } from './components/ReportAccordion';
import { BottomStatusBar } from './components/BottomStatusBar';

const App: React.FC = () => {
    const [sectorNombre, setSectorNombre] = useState<string>(Object.keys(SECTORES)[0]);
    const [biomasaUsuario, setBiomasaUsuario] = useState<number>(5000);
    const [precioSacoUsuario, setPrecioSacoUsuario] = useState<number>(25.0);
    
    const coordenadas = SECTORES[sectorNombre];

    // Memoize derived data to prevent recalculations on every render
    const { tempActual, tempManana, apiError } = useMemo(() => obtenerTempReal(coordenadas.lat, coordenadas.lon), [coordenadas]);
    const phActual = 7.8; // Constant from original code
    const oxActual = 5.2; // Constant from original code

    const shrimpStatus: ShrimpStatus = useMemo(() => obtenerEstadoCamaron(tempActual, phActual, oxActual), [tempActual]);

    const { alimentoSugerido, ahorroTotal, tasaReal } = useMemo(() => calcularAhorro(tempActual, biomasaUsuario, precioSacoUsuario), [tempActual, biomasaUsuario, precioSacoUsuario]);

    const historicalData: HistoricalDataPoint[] = useMemo(() => obtenerDatosHistoricos(), []);

    const ahora = new Date();
    const formattedDate = ahora.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    const descManana = useMemo(() => obtenerEstadoCamaron(tempManana, phActual, oxActual).description, [tempManana]);

    const handleSectorChange = useCallback((value: string) => setSectorNombre(value), []);
    const handleBiomassChange = useCallback((value: number) => setBiomasaUsuario(value), []);
    const handlePriceChange = useCallback((value: number) => setPrecioSacoUsuario(value), []);

    const statusColors = {
        healthy: 'text-emerald-400',
        cold: 'text-blue-400',
        stressed: 'text-amber-400',
        suffocating: 'text-red-400'
    };

    return (
        <div className="min-h-screen p-4 md:p-8 text-gray-200">
            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-24">
                {/* Left Column: Controls and Main Status */}
                <div className="lg:col-span-1 flex flex-col gap-8">
                    <header>
                        <h1 className="text-4xl font-bold text-white flex items-center gap-3">🦐 AquaData Pro</h1>
                        <p className="text-gray-400 capitalize mt-1">{formattedDate} {formattedTime}</p>
                    </header>
                    <ControlPanel 
                        sector={sectorNombre}
                        onSectorChange={handleSectorChange}
                        biomass={biomasaUsuario}
                        onBiomassChange={handleBiomassChange}
                        price={precioSacoUsuario}
                        onPriceChange={handlePriceChange}
                        coordinates={coordenadas}
                    />
                    <StatusCard status={shrimpStatus} />
                </div>

                {/* Right Column: KPIs and Charts */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    {apiError && (
                         <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-xl flex items-center gap-3" role="alert">
                            <span className="text-xl">📡</span>
                            <div>
                                <p className="font-bold">Alerta de Sistema</p>
                                <p className="text-sm">No se pudo conectar con la API. Usando datos de emergencia (26.0°C).</p>
                            </div>
                        </div>
                    )}
                   
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <KpiCard title="Hoy (Actual)" value={`${tempActual.toFixed(1)}°C`} delta={`${(tempManana - tempActual).toFixed(1)}°C`} deltaLabel="vs Mañana" />
                        <KpiCard title="Mañana (Predicción)" value={`${tempManana.toFixed(1)}°C`} delta={descManana} deltaLabel="Riesgo" />
                        <KpiCard title="Ración Sugerida" value={`${alimentoSugerido.toFixed(1)} kg`} delta={`${(tasaReal * 100).toFixed(2)}%`} deltaLabel="Tasa Real" />
                        <KpiCard title="Ahorro Estimado Hoy" value={`$${ahorroTotal.toFixed(2)}`} delta="vs. Gasto Ciego (3%)" deltaColor={ahorroTotal > 0 ? 'emerald' : 'red'} />
                    </div>

                    <SolutionsPanel status={shrimpStatus} />

                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 md:p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">📈 Tendencia de Temperatura (Últimos 7 Días)</h3>
                        <TrendChart data={historicalData} lineColor={shrimpStatus.color} />
                    </div>

                    <ReportAccordion />
                </div>
            </main>
            <BottomStatusBar status={shrimpStatus} savings={ahorroTotal} />
        </div>
    );
};

export default App;
