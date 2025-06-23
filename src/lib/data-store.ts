import { SalesData } from '../types/data';

// Historical data store with multiple weeks
export const historicalSalesData: SalesData[] = [
    {
        weekEnding: "2024-03-22",
        reps: [
            {
                name: "JP",
                color: "#FF4B4B",  // Red
                metrics: {
                    hoursWorked: 40,
                    callLogs: 180,
                    accountsTouched: 120,
                    spokeWith: 45,
                    leads: 15,
                    leadsVsAccountsTouchedPercent: "12.5%",
                    spokeWithVsLeadsSentPercent: "33.3%",
                    callsPerHour: 4.5
                }
            },
            {
                name: "Kayla",
                color: "#4CAF50",  // Green
                metrics: {
                    hoursWorked: 38,
                    callLogs: 165,
                    accountsTouched: 110,
                    spokeWith: 42,
                    leads: 14,
                    leadsVsAccountsTouchedPercent: "12.7%",
                    spokeWithVsLeadsSentPercent: "33.3%",
                    callsPerHour: 4.3
                }
            },
            {
                name: "Ken",
                color: "#2196F3",  // Blue
                metrics: {
                    hoursWorked: 42,
                    callLogs: 190,
                    accountsTouched: 130,
                    spokeWith: 48,
                    leads: 16,
                    leadsVsAccountsTouchedPercent: "12.3%",
                    spokeWithVsLeadsSentPercent: "33.3%",
                    callsPerHour: 4.5
                }
            },
            {
                name: "Paul",
                color: "#9C27B0",  // Purple
                metrics: {
                    hoursWorked: 39,
                    callLogs: 175,
                    accountsTouched: 115,
                    spokeWith: 43,
                    leads: 15,
                    leadsVsAccountsTouchedPercent: "13.0%",
                    spokeWithVsLeadsSentPercent: "34.9%",
                    callsPerHour: 4.5
                }
            },
            {
                name: "Margo",
                color: "#FF9800",  // Orange
                metrics: {
                    hoursWorked: 41,
                    callLogs: 185,
                    accountsTouched: 125,
                    spokeWith: 46,
                    leads: 15,
                    leadsVsAccountsTouchedPercent: "12.0%",
                    spokeWithVsLeadsSentPercent: "32.6%",
                    callsPerHour: 4.5
                }
            },
            {
                name: "Brian",
                color: "#795548",  // Brown
                metrics: {
                    hoursWorked: 40,
                    callLogs: 180,
                    accountsTouched: 120,
                    spokeWith: 45,
                    leads: 15,
                    leadsVsAccountsTouchedPercent: "12.5%",
                    spokeWithVsLeadsSentPercent: "33.3%",
                    callsPerHour: 4.5
                }
            }
        ]
    },
    {
        weekEnding: "2024-03-15",
        reps: [
            {
                name: "JP",
                color: "#FF4B4B",  // Red
                metrics: {
                    hoursWorked: 38,
                    callLogs: 170,
                    accountsTouched: 115,
                    spokeWith: 42,
                    leads: 14,
                    leadsVsAccountsTouchedPercent: "12.2%",
                    spokeWithVsLeadsSentPercent: "33.1%",
                    callsPerHour: 4.4
                }
            },
            {
                name: "Kayla",
                color: "#4CAF50",  // Green
                metrics: {
                    hoursWorked: 37,
                    callLogs: 160,
                    accountsTouched: 105,
                    spokeWith: 40,
                    leads: 13,
                    leadsVsAccountsTouchedPercent: "12.4%",
                    spokeWithVsLeadsSentPercent: "32.5%",
                    callsPerHour: 4.3
                }
            },
            {
                name: "Ken",
                color: "#2196F3",  // Blue
                metrics: {
                    hoursWorked: 41,
                    callLogs: 185,
                    accountsTouched: 125,
                    spokeWith: 46,
                    leads: 15,
                    leadsVsAccountsTouchedPercent: "12.0%",
                    spokeWithVsLeadsSentPercent: "32.6%",
                    callsPerHour: 4.5
                }
            },
            {
                name: "Paul",
                color: "#9C27B0",  // Purple
                metrics: {
                    hoursWorked: 38,
                    callLogs: 170,
                    accountsTouched: 110,
                    spokeWith: 41,
                    leads: 14,
                    leadsVsAccountsTouchedPercent: "12.7%",
                    spokeWithVsLeadsSentPercent: "33.3%",
                    callsPerHour: 4.4
                }
            },
            {
                name: "Margo",
                color: "#FF9800",  // Orange
                metrics: {
                    hoursWorked: 40,
                    callLogs: 180,
                    accountsTouched: 120,
                    spokeWith: 44,
                    leads: 14,
                    leadsVsAccountsTouchedPercent: "11.7%",
                    spokeWithVsLeadsSentPercent: "31.8%",
                    callsPerHour: 4.5
                }
            },
            {
                name: "Brian",
                color: "#795548",  // Brown
                metrics: {
                    hoursWorked: 39,
                    callLogs: 175,
                    accountsTouched: 115,
                    spokeWith: 43,
                    leads: 14,
                    leadsVsAccountsTouchedPercent: "12.2%",
                    spokeWithVsLeadsSentPercent: "32.4%",
                    callsPerHour: 4.4
                }
            }
        ]
    },
    // Add more historical weeks here
];

// Function to add new weekly data
export function addWeeklyData(newData: SalesData) {
    // Check if the week already exists
    const existingWeekIndex = historicalSalesData.findIndex(
        week => week.weekEnding === newData.weekEnding
    );

    if (existingWeekIndex !== -1) {
        // Update existing week
        historicalSalesData[existingWeekIndex] = newData;
    } else {
        // Add new week at the beginning (most recent first)
        historicalSalesData.unshift(newData);
    }
}

// Function to get all historical data sorted by date (most recent first)
export function getAllHistoricalData(): SalesData[] {
    return [...historicalSalesData].sort((a, b) => 
        new Date(b.weekEnding).getTime() - new Date(a.weekEnding).getTime()
    );
}

// Function to format data for Gemini's context
export function formatDataForGeminiContext(): string {
    const sortedData = getAllHistoricalData();
    
    return sortedData.map(weekData => `
Week Ending ${weekData.weekEnding}:
${weekData.reps.map(rep => `
${rep.name}'s Performance Metrics:
- Hours Worked: ${rep.metrics.hoursWorked}
- Call Logs: ${rep.metrics.callLogs}
- Accounts Touched: ${rep.metrics.accountsTouched}
- Spoke With: ${rep.metrics.spokeWith}
- Number of Leads: ${rep.metrics.leads}
- Leads vs Accounts Touched: ${rep.metrics.leadsVsAccountsTouchedPercent}
- Spoke With vs Leads Sent: ${rep.metrics.spokeWithVsLeadsSentPercent}
- Calls per Hour: ${rep.metrics.callsPerHour}
`).join('\n')}
`).join('\n---\n');
} 