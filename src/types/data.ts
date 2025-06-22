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

export interface WeeklyMetrics {
  weekPeriod: string; // e.g., "Nov 11-17", "Nov 17-24"
  [repMetric: string]: number | string; // Dynamic rep names with metrics
}

export interface SalesRep {
  name: string;
  color: string;
}

export interface DashboardConfig {
  id: string;
  title: string;
  metric: string; // Single metric instead of array
  yAxisLabel: string;
  description: string;
  category: string;
  color: string;
}

export const DEFAULT_SALES_REPS: SalesRep[] = [
  { name: 'Rep 1', color: '#8884d8' },
  { name: 'Rep 2', color: '#82ca9d' },
  { name: 'Rep 3', color: '#ffc658' },
  { name: 'Rep 4', color: '#ff7c7c' },
  { name: 'Rep 5', color: '#8dd1e1' },
  { name: 'Rep 6', color: '#d084d0' },
];

// Individual dashboard for each metric
export const DASHBOARD_CONFIGS: DashboardConfig[] = [
  {
    id: 'number-of-hours',
    title: 'Number of Hours',
    metric: 'numberOfHours',
    yAxisLabel: 'Hours',
    description: 'Track weekly working hours across all sales representatives',
    category: 'Activity',
    color: 'blue'
  },
  {
    id: 'call-logs',
    title: 'Call Logs',
    metric: 'callLogs',
    yAxisLabel: 'Number of Calls',
    description: 'Monitor total call volume and outreach activity',
    category: 'Activity',
    color: 'indigo'
  },
  {
    id: 'accounts-touched',
    title: 'Accounts Touched',
    metric: 'accountsTouched',
    yAxisLabel: 'Number of Accounts',
    description: 'Track unique accounts contacted each week',
    category: 'Activity',
    color: 'cyan'
  },
  {
    id: 'spoke-with',
    title: 'Spoke With',
    metric: 'spokeWith',
    yAxisLabel: 'Number of Conversations',
    description: 'Monitor successful conversations with prospects',
    category: 'Engagement',
    color: 'green'
  },
  {
    id: 'number-of-leads',
    title: 'Number of Leads',
    metric: 'numberOfLeads',
    yAxisLabel: 'Lead Count',
    description: 'Track qualified leads generated each week',
    category: 'Conversion',
    color: 'emerald'
  },
  {
    id: 'leads-vs-accounts-touched',
    title: 'Leads vs Accounts Touched (%)',
    metric: 'leadsVsAccountsTouched',
    yAxisLabel: 'Percentage (%)',
    description: 'Conversion rate from accounts touched to qualified leads',
    category: 'Efficiency',
    color: 'purple'
  },
  {
    id: 'spoke-with-vs-leads-sent',
    title: 'Spoke With vs Leads Sent (%)',
    metric: 'spokeWithVsLeadsSent',
    yAxisLabel: 'Percentage (%)',
    description: 'Conversion rate from conversations to qualified leads',
    category: 'Efficiency',
    color: 'violet'
  },
  {
    id: 'calls-per-hour',
    title: 'Calls per Hour',
    metric: 'callsPerHour',
    yAxisLabel: 'Calls/Hour',
    description: 'Productivity metric showing call efficiency',
    category: 'Efficiency',
    color: 'pink'
  }
];

// Expanded data with 8 weeks total - More realistic with random variations
export const DEFAULT_WEEKLY_DATA: WeeklyMetrics[] = [
  {
    weekPeriod: 'Oct 28-Nov 3',
    // Rep 1
    'Rep 1-numberOfHours': 28,
    'Rep 1-callLogs': 580,
    'Rep 1-accountsTouched': 115,
    'Rep 1-spokeWith': 12,
    'Rep 1-numberOfLeads': 1,
    'Rep 1-leadsVsAccountsTouched': 0.870,
    'Rep 1-spokeWithVsLeadsSent': 8.333,
    'Rep 1-callsPerHour': 20.71,
    
    // Rep 2
    'Rep 2-numberOfHours': 18,
    'Rep 2-callLogs': 195,
    'Rep 2-accountsTouched': 72,
    'Rep 2-spokeWith': 11,
    'Rep 2-numberOfLeads': 0,
    'Rep 2-leadsVsAccountsTouched': 0.000,
    'Rep 2-spokeWithVsLeadsSent': 0.000,
    'Rep 2-callsPerHour': 10.83,
    
    // Rep 3
    'Rep 3-numberOfHours': 12,
    'Rep 3-callLogs': 220,
    'Rep 3-accountsTouched': 68,
    'Rep 3-spokeWith': 5,
    'Rep 3-numberOfLeads': 1,
    'Rep 3-leadsVsAccountsTouched': 1.471,
    'Rep 3-spokeWithVsLeadsSent': 20.000,
    'Rep 3-callsPerHour': 18.33,
    
    // Rep 4
    'Rep 4-numberOfHours': 15,
    'Rep 4-callLogs': 125,
    'Rep 4-accountsTouched': 62,
    'Rep 4-spokeWith': 4,
    'Rep 4-numberOfLeads': 0,
    'Rep 4-leadsVsAccountsTouched': 0.000,
    'Rep 4-spokeWithVsLeadsSent': 0.000,
    'Rep 4-callsPerHour': 8.33,
    
    // Rep 5
    'Rep 5-numberOfHours': 16,
    'Rep 5-callLogs': 52,
    'Rep 5-accountsTouched': 28,
    'Rep 5-spokeWith': 6,
    'Rep 5-numberOfLeads': 1,
    'Rep 5-leadsVsAccountsTouched': 3.571,
    'Rep 5-spokeWithVsLeadsSent': 16.667,
    'Rep 5-callsPerHour': 3.25,
    
    // Rep 6
    'Rep 6-numberOfHours': 14,
    'Rep 6-callLogs': 240,
    'Rep 6-accountsTouched': 78,
    'Rep 6-spokeWith': 6,
    'Rep 6-numberOfLeads': 3,
    'Rep 6-leadsVsAccountsTouched': 3.846,
    'Rep 6-spokeWithVsLeadsSent': 50.000,
    'Rep 6-callsPerHour': 17.14,
  },
  {
    weekPeriod: 'Nov 4-10',
    // Rep 1 - slight dip in performance
    'Rep 1-numberOfHours': 25,
    'Rep 1-callLogs': 520,
    'Rep 1-accountsTouched': 98,
    'Rep 1-spokeWith': 8,
    'Rep 1-numberOfLeads': 0,
    'Rep 1-leadsVsAccountsTouched': 0.000,
    'Rep 1-spokeWithVsLeadsSent': 0.000,
    'Rep 1-callsPerHour': 20.80,
    
    // Rep 2 - improvement
    'Rep 2-numberOfHours': 22,
    'Rep 2-callLogs': 285,
    'Rep 2-accountsTouched': 95,
    'Rep 2-spokeWith': 18,
    'Rep 2-numberOfLeads': 2,
    'Rep 2-leadsVsAccountsTouched': 2.105,
    'Rep 2-spokeWithVsLeadsSent': 11.111,
    'Rep 2-callsPerHour': 12.95,
    
    // Rep 3 - big jump
    'Rep 3-numberOfHours': 20,
    'Rep 3-callLogs': 340,
    'Rep 3-accountsTouched': 88,
    'Rep 3-spokeWith': 12,
    'Rep 3-numberOfLeads': 3,
    'Rep 3-leadsVsAccountsTouched': 3.409,
    'Rep 3-spokeWithVsLeadsSent': 25.000,
    'Rep 3-callsPerHour': 17.00,
    
    // Rep 4 - inconsistent
    'Rep 4-numberOfHours': 12,
    'Rep 4-callLogs': 98,
    'Rep 4-accountsTouched': 45,
    'Rep 4-spokeWith': 2,
    'Rep 4-numberOfLeads': 0,
    'Rep 4-leadsVsAccountsTouched': 0.000,
    'Rep 4-spokeWithVsLeadsSent': 0.000,
    'Rep 4-callsPerHour': 8.17,
    
    // Rep 5 - steady decline
    'Rep 5-numberOfHours': 14,
    'Rep 5-callLogs': 42,
    'Rep 5-accountsTouched': 22,
    'Rep 5-spokeWith': 3,
    'Rep 5-numberOfLeads': 0,
    'Rep 5-leadsVsAccountsTouched': 0.000,
    'Rep 5-spokeWithVsLeadsSent': 0.000,
    'Rep 5-callsPerHour': 3.00,
    
    // Rep 6 - strong week
    'Rep 6-numberOfHours': 18,
    'Rep 6-callLogs': 315,
    'Rep 6-accountsTouched': 102,
    'Rep 6-spokeWith': 14,
    'Rep 6-numberOfLeads': 5,
    'Rep 6-leadsVsAccountsTouched': 4.902,
    'Rep 6-spokeWithVsLeadsSent': 35.714,
    'Rep 6-callsPerHour': 17.50,
  },
  {
    weekPeriod: 'Nov 11-17',
    // Rep 1 - recovery and strong performance
    'Rep 1-numberOfHours': 32,
    'Rep 1-callLogs': 648,
    'Rep 1-accountsTouched': 126,
    'Rep 1-spokeWith': 16,
    'Rep 1-numberOfLeads': 2,
    'Rep 1-leadsVsAccountsTouched': 1.587,
    'Rep 1-spokeWithVsLeadsSent': 12.500,
    'Rep 1-callsPerHour': 20.25,
    
    // Rep 2 - slight dip
    'Rep 2-numberOfHours': 19,
    'Rep 2-callLogs': 195,
    'Rep 2-accountsTouched': 68,
    'Rep 2-spokeWith': 9,
    'Rep 2-numberOfLeads': 1,
    'Rep 2-leadsVsAccountsTouched': 1.471,
    'Rep 2-spokeWithVsLeadsSent': 11.111,
    'Rep 2-callsPerHour': 10.26,
    
    // Rep 3 - maintaining momentum
    'Rep 3-numberOfHours': 15,
    'Rep 3-callLogs': 262,
    'Rep 3-accountsTouched': 76,
    'Rep 3-spokeWith': 7,
    'Rep 3-numberOfLeads': 2,
    'Rep 3-leadsVsAccountsTouched': 2.632,
    'Rep 3-spokeWithVsLeadsSent': 28.571,
    'Rep 3-callsPerHour': 17.47,
    
    // Rep 4 - improvement
    'Rep 4-numberOfHours': 17,
    'Rep 4-callLogs': 143,
    'Rep 4-accountsTouched': 70,
    'Rep 4-spokeWith': 6,
    'Rep 4-numberOfLeads': 1,
    'Rep 4-leadsVsAccountsTouched': 1.429,
    'Rep 4-spokeWithVsLeadsSent': 16.667,
    'Rep 4-callsPerHour': 8.41,
    
    // Rep 5 - struggling
    'Rep 5-numberOfHours': 20,
    'Rep 5-callLogs': 68,
    'Rep 5-accountsTouched': 37,
    'Rep 5-spokeWith': 8,
    'Rep 5-numberOfLeads': 2,
    'Rep 5-leadsVsAccountsTouched': 5.405,
    'Rep 5-spokeWithVsLeadsSent': 25.000,
    'Rep 5-callsPerHour': 3.40,
    
    // Rep 6 - slight decline
    'Rep 6-numberOfHours': 16,
    'Rep 6-callLogs': 266,
    'Rep 6-accountsTouched': 85,
    'Rep 6-spokeWith': 7,
    'Rep 6-numberOfLeads': 4,
    'Rep 6-leadsVsAccountsTouched': 4.706,
    'Rep 6-spokeWithVsLeadsSent': 57.143,
    'Rep 6-callsPerHour': 16.63,
  },
  {
    weekPeriod: 'Nov 17-24',
    // Rep 1 - maintaining high performance but different metrics fluctuate
    'Rep 1-numberOfHours': 32,
    'Rep 1-callLogs': 410,
    'Rep 1-accountsTouched': 112,
    'Rep 1-spokeWith': 21,
    'Rep 1-numberOfLeads': 2,
    'Rep 1-leadsVsAccountsTouched': 1.786,
    'Rep 1-spokeWithVsLeadsSent': 9.524,
    'Rep 1-callsPerHour': 12.81,
    
    // Rep 2 - inconsistent week
    'Rep 2-numberOfHours': 20,
    'Rep 2-callLogs': 293,
    'Rep 2-accountsTouched': 100,
    'Rep 2-spokeWith': 16,
    'Rep 2-numberOfLeads': 0,
    'Rep 2-leadsVsAccountsTouched': 0.000,
    'Rep 2-spokeWithVsLeadsSent': 0.000,
    'Rep 2-callsPerHour': 14.65,
    
    // Rep 3 - exceptional week with long hours
    'Rep 3-numberOfHours': 50.5,
    'Rep 3-callLogs': 458,
    'Rep 3-accountsTouched': 156,
    'Rep 3-spokeWith': 11,
    'Rep 3-numberOfLeads': 3,
    'Rep 3-leadsVsAccountsTouched': 1.923,
    'Rep 3-spokeWithVsLeadsSent': 27.273,
    'Rep 3-callsPerHour': 9.07,
    
    // Rep 4 - bad week
    'Rep 4-numberOfHours': 12,
    'Rep 4-callLogs': 97,
    'Rep 4-accountsTouched': 60,
    'Rep 4-spokeWith': 2,
    'Rep 4-numberOfLeads': 1,
    'Rep 4-leadsVsAccountsTouched': 1.667,
    'Rep 4-spokeWithVsLeadsSent': 50.000,
    'Rep 4-callsPerHour': 8.08,
    
    // Rep 5 - sudden improvement
    'Rep 5-numberOfHours': 15,
    'Rep 5-callLogs': 233,
    'Rep 5-accountsTouched': 77,
    'Rep 5-spokeWith': 4,
    'Rep 5-numberOfLeads': 2,
    'Rep 5-leadsVsAccountsTouched': 2.597,
    'Rep 5-spokeWithVsLeadsSent': 50.000,
    'Rep 5-callsPerHour': 15.53,
    
    // Rep 6 - moderate performance
    'Rep 6-numberOfHours': 18,
    'Rep 6-callLogs': 220,
    'Rep 6-accountsTouched': 75,
    'Rep 6-spokeWith': 8,
    'Rep 6-numberOfLeads': 3,
    'Rep 6-leadsVsAccountsTouched': 4.000,
    'Rep 6-spokeWithVsLeadsSent': 37.500,
    'Rep 6-callsPerHour': 12.22,
  },
  {
    weekPeriod: 'Nov 24-Dec 1',
    // Rep 1 - strong but not linear growth
    'Rep 1-numberOfHours': 29,
    'Rep 1-callLogs': 385,
    'Rep 1-accountsTouched': 95,
    'Rep 1-spokeWith': 13,
    'Rep 1-numberOfLeads': 4,
    'Rep 1-leadsVsAccountsTouched': 4.211,
    'Rep 1-spokeWithVsLeadsSent': 30.769,
    'Rep 1-callsPerHour': 13.28,
    
    // Rep 2 - recovery
    'Rep 2-numberOfHours': 24,
    'Rep 2-callLogs': 340,
    'Rep 2-accountsTouched': 118,
    'Rep 2-spokeWith': 22,
    'Rep 2-numberOfLeads': 3,
    'Rep 2-leadsVsAccountsTouched': 2.542,
    'Rep 2-spokeWithVsLeadsSent': 13.636,
    'Rep 2-callsPerHour': 14.17,
    
    // Rep 3 - back to normal hours, different results
    'Rep 3-numberOfHours': 22,
    'Rep 3-callLogs': 298,
    'Rep 3-accountsTouched': 89,
    'Rep 3-spokeWith': 15,
    'Rep 3-numberOfLeads': 1,
    'Rep 3-leadsVsAccountsTouched': 1.124,
    'Rep 3-spokeWithVsLeadsSent': 6.667,
    'Rep 3-callsPerHour': 13.55,
    
    // Rep 4 - improvement but still inconsistent
    'Rep 4-numberOfHours': 19,
    'Rep 4-callLogs': 168,
    'Rep 4-accountsTouched': 82,
    'Rep 4-spokeWith': 9,
    'Rep 4-numberOfLeads': 2,
    'Rep 4-leadsVsAccountsTouched': 2.439,
    'Rep 4-spokeWithVsLeadsSent': 22.222,
    'Rep 4-callsPerHour': 8.84,
    
    // Rep 5 - decline again
    'Rep 5-numberOfHours': 13,
    'Rep 5-callLogs': 156,
    'Rep 5-accountsTouched': 52,
    'Rep 5-spokeWith': 3,
    'Rep 5-numberOfLeads': 1,
    'Rep 5-leadsVsAccountsTouched': 1.923,
    'Rep 5-spokeWithVsLeadsSent': 33.333,
    'Rep 5-callsPerHour': 12.00,
    
    // Rep 6 - strong performance
    'Rep 6-numberOfHours': 26,
    'Rep 6-callLogs': 312,
    'Rep 6-accountsTouched': 98,
    'Rep 6-spokeWith': 18,
    'Rep 6-numberOfLeads': 6,
    'Rep 6-leadsVsAccountsTouched': 6.122,
    'Rep 6-spokeWithVsLeadsSent': 33.333,
    'Rep 6-callsPerHour': 12.00,
  },
  {
    weekPeriod: 'Dec 1-8',
    // Rep 1 - exceptional week
    'Rep 1-numberOfHours': 38,
    'Rep 1-callLogs': 495,
    'Rep 1-accountsTouched': 135,
    'Rep 1-spokeWith': 22,
    'Rep 1-numberOfLeads': 4,
    'Rep 1-leadsVsAccountsTouched': 2.963,
    'Rep 1-spokeWithVsLeadsSent': 18.182,
    'Rep 1-callsPerHour': 13.03,
    
    // Rep 2 - good momentum
    'Rep 2-numberOfHours': 25,
    'Rep 2-callLogs': 340,
    'Rep 2-accountsTouched': 110,
    'Rep 2-spokeWith': 18,
    'Rep 2-numberOfLeads': 3,
    'Rep 2-leadsVsAccountsTouched': 2.727,
    'Rep 2-spokeWithVsLeadsSent': 16.667,
    'Rep 2-callsPerHour': 13.60,
    
    // Rep 3 - inconsistent performance
    'Rep 3-numberOfHours': 17,
    'Rep 3-callLogs': 238,
    'Rep 3-accountsTouched': 71,
    'Rep 3-spokeWith': 5,
    'Rep 3-numberOfLeads': 1,
    'Rep 3-leadsVsAccountsTouched': 1.408,
    'Rep 3-spokeWithVsLeadsSent': 20.000,
    'Rep 3-callsPerHour': 14.00,
    
    // Rep 4 - struggling week
    'Rep 4-numberOfHours': 11,
    'Rep 4-callLogs': 88,
    'Rep 4-accountsTouched': 42,
    'Rep 4-spokeWith': 2,
    'Rep 4-numberOfLeads': 0,
    'Rep 4-leadsVsAccountsTouched': 0.000,
    'Rep 4-spokeWithVsLeadsSent': 0.000,
    'Rep 4-callsPerHour': 8.00,
    
    // Rep 5 - breakthrough week
    'Rep 5-numberOfHours': 28,
    'Rep 5-callLogs': 378,
    'Rep 5-accountsTouched': 125,
    'Rep 5-spokeWith': 19,
    'Rep 5-numberOfLeads': 5,
    'Rep 5-leadsVsAccountsTouched': 4.000,
    'Rep 5-spokeWithVsLeadsSent': 26.316,
    'Rep 5-callsPerHour': 13.50,
    
    // Rep 6 - slight decline
    'Rep 6-numberOfHours': 21,
    'Rep 6-callLogs': 252,
    'Rep 6-accountsTouched': 78,
    'Rep 6-spokeWith': 9,
    'Rep 6-numberOfLeads': 2,
    'Rep 6-leadsVsAccountsTouched': 2.564,
    'Rep 6-spokeWithVsLeadsSent': 22.222,
    'Rep 6-callsPerHour': 12.00,
  },
  {
    weekPeriod: 'Dec 8-15',
    // Rep 1 - maintaining excellence with variation
    'Rep 1-numberOfHours': 35,
    'Rep 1-callLogs': 455,
    'Rep 1-accountsTouched': 118,
    'Rep 1-spokeWith': 19,
    'Rep 1-numberOfLeads': 3,
    'Rep 1-leadsVsAccountsTouched': 2.542,
    'Rep 1-spokeWithVsLeadsSent': 15.789,
    'Rep 1-callsPerHour': 13.00,
    
    // Rep 2 - dip in performance
    'Rep 2-numberOfHours': 18,
    'Rep 2-callLogs': 234,
    'Rep 2-accountsTouched': 82,
    'Rep 2-spokeWith': 11,
    'Rep 2-numberOfLeads': 1,
    'Rep 2-leadsVsAccountsTouched': 1.220,
    'Rep 2-spokeWithVsLeadsSent': 9.091,
    'Rep 2-callsPerHour': 13.00,
    
    // Rep 3 - big comeback
    'Rep 3-numberOfHours': 31,
    'Rep 3-callLogs': 434,
    'Rep 3-accountsTouched': 142,
    'Rep 3-spokeWith': 24,
    'Rep 3-numberOfLeads': 7,
    'Rep 3-leadsVsAccountsTouched': 4.930,
    'Rep 3-spokeWithVsLeadsSent': 29.167,
    'Rep 3-callsPerHour': 14.00,
    
    // Rep 4 - recovery
    'Rep 4-numberOfHours': 21,
    'Rep 4-callLogs': 189,
    'Rep 4-accountsTouched': 95,
    'Rep 4-spokeWith': 12,
    'Rep 4-numberOfLeads': 3,
    'Rep 4-leadsVsAccountsTouched': 3.158,
    'Rep 4-spokeWithVsLeadsSent': 25.000,
    'Rep 4-callsPerHour': 9.00,
    
    // Rep 5 - maintaining good performance
    'Rep 5-numberOfHours': 26,
    'Rep 5-callLogs': 338,
    'Rep 5-accountsTouched': 108,
    'Rep 5-spokeWith': 16,
    'Rep 5-numberOfLeads': 4,
    'Rep 5-leadsVsAccountsTouched': 3.704,
    'Rep 5-spokeWithVsLeadsSent': 25.000,
    'Rep 5-callsPerHour': 13.00,
    
    // Rep 6 - strong week
    'Rep 6-numberOfHours': 29,
    'Rep 6-callLogs': 377,
    'Rep 6-accountsTouched': 115,
    'Rep 6-spokeWith': 21,
    'Rep 6-numberOfLeads': 8,
    'Rep 6-leadsVsAccountsTouched': 6.957,
    'Rep 6-spokeWithVsLeadsSent': 38.095,
    'Rep 6-callsPerHour': 13.00,
  },
  {
    weekPeriod: 'Dec 15-22',
    // Rep 1 - slight decline from peak
    'Rep 1-numberOfHours': 33,
    'Rep 1-callLogs': 429,
    'Rep 1-accountsTouched': 108,
    'Rep 1-spokeWith': 15,
    'Rep 1-numberOfLeads': 2,
    'Rep 1-leadsVsAccountsTouched': 1.852,
    'Rep 1-spokeWithVsLeadsSent': 13.333,
    'Rep 1-callsPerHour': 13.00,
    
    // Rep 2 - breakthrough week
    'Rep 2-numberOfHours': 27,
    'Rep 2-callLogs': 378,
    'Rep 2-accountsTouched': 132,
    'Rep 2-spokeWith': 28,
    'Rep 2-numberOfLeads': 6,
    'Rep 2-leadsVsAccountsTouched': 4.545,
    'Rep 2-spokeWithVsLeadsSent': 21.429,
    'Rep 2-callsPerHour': 14.00,
    
    // Rep 3 - maintaining momentum
    'Rep 3-numberOfHours': 28,
    'Rep 3-callLogs': 392,
    'Rep 3-accountsTouched': 125,
    'Rep 3-spokeWith': 18,
    'Rep 3-numberOfLeads': 5,
    'Rep 3-leadsVsAccountsTouched': 4.000,
    'Rep 3-spokeWithVsLeadsSent': 27.778,
    'Rep 3-callsPerHour': 14.00,
    
    // Rep 4 - inconsistent again
    'Rep 4-numberOfHours': 16,
    'Rep 4-callLogs': 144,
    'Rep 4-accountsTouched': 68,
    'Rep 4-spokeWith': 7,
    'Rep 4-numberOfLeads': 1,
    'Rep 4-leadsVsAccountsTouched': 1.471,
    'Rep 4-spokeWithVsLeadsSent': 14.286,
    'Rep 4-callsPerHour': 9.00,
    
    // Rep 5 - strong finish
    'Rep 5-numberOfHours': 30,
    'Rep 5-callLogs': 420,
    'Rep 5-accountsTouched': 138,
    'Rep 5-spokeWith': 25,
    'Rep 5-numberOfLeads': 7,
    'Rep 5-leadsVsAccountsTouched': 5.072,
    'Rep 5-spokeWithVsLeadsSent': 28.000,
    'Rep 5-callsPerHour': 14.00,
    
    // Rep 6 - exceptional finish
    'Rep 6-numberOfHours': 32,
    'Rep 6-callLogs': 448,
    'Rep 6-accountsTouched': 145,
    'Rep 6-spokeWith': 32,
    'Rep 6-numberOfLeads': 10,
    'Rep 6-leadsVsAccountsTouched': 6.897,
    'Rep 6-spokeWithVsLeadsSent': 31.250,
    'Rep 6-callsPerHour': 14.00,
  }
];

export const METRIC_LABELS: { [key: string]: string } = {
  numberOfHours: 'Number of Hours',
  callLogs: 'Call Logs',
  accountsTouched: 'Accounts Touched',
  spokeWith: 'Spoke With',
  numberOfLeads: 'Number of Leads',
  leadsVsAccountsTouched: 'Leads vs Accounts Touched (%)',
  spokeWithVsLeadsSent: 'Spoke With vs Leads Sent (%)',
  callsPerHour: 'Calls per Hour'
}; 