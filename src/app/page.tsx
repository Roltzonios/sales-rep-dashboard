'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RepPerformance, SalesRep, DEFAULT_SALES_REPS, DEFAULT_PERFORMANCE_DATA } from '../types/data';
import { isValidNumber } from '../lib/utils';

export default function Dashboard() {
  const [salesReps, setSalesReps] = useState<SalesRep[]>(DEFAULT_SALES_REPS);
  const [performanceData, setPerformanceData] = useState<RepPerformance[]>(DEFAULT_PERFORMANCE_DATA);
  const [visibleReps, setVisibleReps] = useState<{ [key: string]: boolean }>(() => {
    const initial: { [key: string]: boolean } = {};
    DEFAULT_SALES_REPS.forEach(rep => {
      initial[rep.name] = true;
    });
    return initial;
  });

  const handleRepNameChange = (index: number, newName: string) => {
    const oldName = salesReps[index].name;
    const updatedReps = [...salesReps];
    updatedReps[index].name = newName;
    setSalesReps(updatedReps);

    // Update performance data with new rep name
    const updatedData = performanceData.map(dataPoint => {
      const newDataPoint = { ...dataPoint };
      if (oldName in newDataPoint) {
        newDataPoint[newName] = newDataPoint[oldName];
        delete newDataPoint[oldName];
      }
      return newDataPoint;
    });
    setPerformanceData(updatedData);

    // Update visibility tracking
    const updatedVisibility = { ...visibleReps };
    if (oldName in updatedVisibility) {
      updatedVisibility[newName] = updatedVisibility[oldName];
      delete updatedVisibility[oldName];
    }
    setVisibleReps(updatedVisibility);
  };

  const handlePerformanceChange = (dateIndex: number, repName: string, value: string) => {
    if (isValidNumber(value)) {
      const updatedData = [...performanceData];
      updatedData[dateIndex][repName] = Number(value);
      setPerformanceData(updatedData);
    }
  };

  const handleVisibilityToggle = (repName: string) => {
    setVisibleReps(prev => ({
      ...prev,
      [repName]: !prev[repName]
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Sales Rep Performance Dashboard</h1>
          
          {/* Sales Rep Configuration */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Sales Representatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {salesReps.map((rep, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: rep.color }}
                  ></div>
                  <input
                    type="text"
                    value={rep.name}
                    onChange={(e) => handleRepNameChange(index, e.target.value)}
                    className="flex-1 p-2 border rounded text-sm"
                    placeholder="Rep Name"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Performance Data Table */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Lead Performance Over Time</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border">Date</th>
                    {salesReps.map((rep, index) => (
                      <th key={index} className="p-3 text-left border">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: rep.color }}
                          ></div>
                          <span>{rep.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {performanceData.map((dataPoint, dateIndex) => (
                    <tr key={dateIndex} className="border-b">
                      <td className="p-3 border font-medium">
                        {formatDate(dataPoint.date)}
                      </td>
                      {salesReps.map((rep, repIndex) => (
                        <td key={repIndex} className="p-3 border">
                          <input
                            type="number"
                            value={dataPoint[rep.name] || 0}
                            onChange={(e) => handlePerformanceChange(dateIndex, rep.name, e.target.value)}
                            className="w-full p-2 border rounded text-center"
                            min="0"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart with Visibility Controls */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Performance Trends</h2>
              
              {/* Visibility Controls */}
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-sm font-medium text-gray-700">Show Lines:</span>
                {salesReps.map((rep, index) => (
                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleReps[rep.name] || false}
                      onChange={() => handleVisibilityToggle(rep.name)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-1">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: rep.color }}
                      ></div>
                      <span className="text-sm font-medium">{rep.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <LineChart width={1000} height={500} data={performanceData} className="mx-auto">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis label={{ value: 'Lead Count', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  labelFormatter={(value) => `Date: ${formatDate(value as string)}`}
                  formatter={(value, name) => [value, `${name} Leads`]}
                />
                <Legend />
                {salesReps.map((rep, index) => (
                  visibleReps[rep.name] && (
                    <Line
                      key={index}
                      type="monotone"
                      dataKey={rep.name}
                      stroke={rep.color}
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  )
                ))}
              </LineChart>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {salesReps.map((rep, index) => {
              const totalLeads = performanceData.reduce((sum, dataPoint) => 
                sum + (Number(dataPoint[rep.name]) || 0), 0
              );
              const avgLeads = Math.round(totalLeads / performanceData.length);
              
              return (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: rep.color }}
                    ></div>
                    <h3 className="font-semibold">{rep.name}</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{totalLeads}</p>
                  <p className="text-sm text-gray-600">Total Leads</p>
                  <p className="text-lg font-semibold text-gray-700">{avgLeads}</p>
                  <p className="text-sm text-gray-600">Avg per Period</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
} 