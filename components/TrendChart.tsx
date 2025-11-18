
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import type { HistoricalDataPoint } from '../types';

interface TrendChartProps {
    data: HistoricalDataPoint[];
    lineColor: string;
}

export const TrendChart: React.FC<TrendChartProps> = ({ data, lineColor }) => {
    return (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} domain={[23, 30]} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(10, 10, 10, 0.8)',
                            borderColor: '#4a5568',
                            borderRadius: '0.5rem'
                        }}
                        labelStyle={{ color: '#e2e8f0' }}
                    />
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={lineColor} stopOpacity={0.4}/>
                            <stop offset="95%" stopColor={lineColor} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                     <Area type="monotone" dataKey="temperature" stroke={lineColor} fillOpacity={1} fill="url(#colorUv)" />
                    <Line type="monotone" dataKey="temperature" stroke={lineColor} strokeWidth={3} dot={{ r: 4, fill: lineColor }} activeDot={{ r: 8 }} name="Temperatura"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
