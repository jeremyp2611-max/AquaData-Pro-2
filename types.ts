
export type ShrimpStatusCode = 'healthy' | 'cold' | 'stressed' | 'suffocating';

export interface ShrimpStatus {
  code: ShrimpStatusCode;
  color: string;
  emoji: string;
  title: string;
  description: string;
}

export interface HistoricalDataPoint {
  date: string;
  temperature: number;
  oxygen: number;
}
