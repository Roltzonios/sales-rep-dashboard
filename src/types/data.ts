export interface LeadData {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

export interface LeadFormData {
  name: string;
  uv: string;
  pv: string;
  amt: string;
}

export const DEFAULT_LEAD_DATA: LeadData[] = [
  { name: 'Lead 1', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Lead 2', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Lead 3', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Lead 4', uv: 2780, pv: 3908, amt: 2000 },
];

export interface RepPerformance {
  date: string;
  [repName: string]: number | string; // Dynamic rep names with their lead counts
}

export interface SalesRep {
  name: string;
  color: string;
}

export const DEFAULT_SALES_REPS: SalesRep[] = [
  { name: 'John Smith', color: '#8884d8' },
  { name: 'Sarah Johnson', color: '#82ca9d' },
  { name: 'Mike Davis', color: '#ffc658' },
  { name: 'Lisa Wilson', color: '#ff7c7c' },
];

export const DEFAULT_PERFORMANCE_DATA: RepPerformance[] = [
  { 
    date: '2024-01-01',
    'John Smith': 15,
    'Sarah Johnson': 22,
    'Mike Davis': 18,
    'Lisa Wilson': 12
  },
  { 
    date: '2024-01-08',
    'John Smith': 18,
    'Sarah Johnson': 25,
    'Mike Davis': 16,
    'Lisa Wilson': 14
  },
  { 
    date: '2024-01-15',
    'John Smith': 22,
    'Sarah Johnson': 28,
    'Mike Davis': 20,
    'Lisa Wilson': 18
  },
  { 
    date: '2024-01-22',
    'John Smith': 25,
    'Sarah Johnson': 30,
    'Mike Davis': 24,
    'Lisa Wilson': 20
  },
  { 
    date: '2024-01-29',
    'John Smith': 28,
    'Sarah Johnson': 32,
    'Mike Davis': 26,
    'Lisa Wilson': 22
  },
  { 
    date: '2024-02-05',
    'John Smith': 30,
    'Sarah Johnson': 35,
    'Mike Davis': 28,
    'Lisa Wilson': 25
  },
]; 