export interface SalesMetrics {
  hoursWorked: number;
  callLogs: number;
  accountsTouched: number;
  spokeWith: number;
  leads: number;
  leadsVsAccountsTouchedPercent: string;
  spokeWithVsLeadsSentPercent: string;
  callsPerHour: number;
}

export interface SalesRep {
  name: string;
  color: string;
  metrics: SalesMetrics;
}

export interface SalesData {
  weekEnding: string;
  reps: SalesRep[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface ChatResponse {
  message: string;
  timestamp: string;
  error?: string;
  debug?: string;
}
