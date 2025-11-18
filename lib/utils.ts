
import type { ShrimpStatus, HistoricalDataPoint } from '../types';

/**
 * Calculates the optimal feed ration and potential savings.
 */
export const calcularAhorro = (tempAgua: number, biomasaKg: number, precioSaco: number): { alimentoSugerido: number, ahorroTotal: number, tasaReal: number } => {
    // Continuous growth model simulation
    const tasaOptima = 0.03 * (1 - 0.01 * Math.pow(tempAgua - 28, 2));
    const tasa = Math.max(0.005, tasaOptima);

    const alimentoNecesarioKg = biomasaKg * tasa;

    const gastoCiego = (biomasaKg * 0.03 / 25) * precioSaco;
    const costoOptimo = (alimentoNecesarioKg / 25) * precioSaco;
    const ahorro = gastoCiego - costoOptimo;

    return { alimentoSugerido: alimentoNecesarioKg, ahorroTotal: ahorro, tasaReal: tasa };
};

/**
 * Determines the shrimp's health status based on water parameters.
 */
export const obtenerEstadoCamaron = (temp: number, ph: number, oxigeno: number): ShrimpStatus => {
    if (temp < 24 || temp > 30) {
        return { code: 'cold', color: '#3b82f6', emoji: '🥶', title: 'Temperatura Crítica', description: 'Riesgo térmico' };
    }
    if (ph < 7.5 || ph > 8.5) {
        return { code: 'stressed', color: '#f59e0b', emoji: '😰', title: 'Estresado', description: 'pH desequilibrado' };
    }
    if (oxigeno < 4) {
        return { code: 'suffocating', color: '#ef4444', emoji: '😵', title: 'Hipoxia', description: 'Oxígeno bajo' };
    }
    return { code: 'healthy', color: '#10b981', emoji: '🦐', title: 'Saludable', description: 'Condiciones óptimas' };
};

/**
 * Mocks an API call to get real temperature data.
 * In a real app, this would use fetch.
 */
export const obtenerTempReal = (lat: number, lon: number): { tempActual: number, tempManana: number, apiError: boolean } => {
    // Mocking the API call to avoid real network requests in this environment.
    // The logic simulates a response based on location.
    try {
        // A simple hash to get deterministic "random" values from lat/lon
        const seed = (lat + lon) * 100;
        const temp_hoy = 26.0 + (seed % 30) / 10 - 1.5; // Temp between 24.5 and 27.5
        const temp_manana = temp_hoy + (seed % 10) / 10 - 0.5; // Small variation for tomorrow
        
        return { tempActual: temp_hoy, tempManana: temp_manana, apiError: false };
    } catch (e) {
        // Fallback data if anything fails
        return { tempActual: 26.0, tempManana: 26.5, apiError: true };
    }
};

/**
 * Generates simulated historical data for the trend chart.
 */
export const obtenerDatosHistoricos = (): HistoricalDataPoint[] => {
    const data: HistoricalDataPoint[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        
        const baseTemp = 26;
        const temp = baseTemp + Math.sin((6-i) / 3) * 1.5 + (Math.random() - 0.5) * 0.6;
        const oxygen = 4.5 + Math.cos((6-i) / 3) * 0.5 + (Math.random() - 0.5) * 0.2;
        
        data.push({
            date: date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
            temperature: parseFloat(temp.toFixed(2)),
            oxygen: parseFloat(oxygen.toFixed(2)),
        });
    }
    return data;
};
