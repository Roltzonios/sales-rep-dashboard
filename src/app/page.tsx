'use client';

import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../components/dashboard-layout';
import { 
  WeeklyMetrics, 
  SalesRep, 
  DEFAULT_SALES_REPS, 
  DEFAULT_WEEKLY_DATA,
  DASHBOARD_CONFIGS,
  METRIC_LABELS
} from '../types/data';

// ShadCN Components
import { Button } from "../../@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../@/components/ui/card";
import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import { Badge } from "../../@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../@/components/ui/tabs";
import { Checkbox } from "../../@/components/ui/checkbox";

// Icons
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Dashboard() {
  const [salesReps, setSalesReps] = useState<SalesRep[]>(DEFAULT_SALES_REPS);
  const [weeklyData, setWeeklyData] = useState<WeeklyMetrics[]>(DEFAULT_WEEKLY_DATA);
  const [repVisibility, setRepVisibility] = useState<{ [key: string]: boolean }>(() => {
    return DEFAULT_SALES_REPS.reduce((acc, rep) => {
      acc[rep.name] = true;
      return acc;
    }, {} as { [key: string]: boolean });
  });
  
  // Timeline state - most recent week is selected by default
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number>(weeklyData.length - 1);
  const [showTimeline, setShowTimeline] = useState<boolean>(false);
  
  // Dashboard navigation state
  const [selectedDashboard, setSelectedDashboard] = useState<string>(DASHBOARD_CONFIGS[0].id);

  // Get the current/selected week data for editing
  const currentWeek = weeklyData[selectedWeekIndex];
  const isCurrentWeek = selectedWeekIndex === weeklyData.length - 1;
  const currentDashboardConfig = DASHBOARD_CONFIGS.find(config => config.id === selectedDashboard)!;

  // Transform data for charts
  const chartData = useMemo(() => {
    return weeklyData.map(week => {
      const weekData: any = { week: week.weekPeriod };
      
      salesReps.forEach(rep => {
        Object.keys(METRIC_LABELS).forEach(metric => {
          const key = `${rep.name}-${metric}`;
          weekData[`${rep.name}-${metric}`] = week[key] || 0;
        });
      });
      
      return weekData;
    });
  }, [weeklyData, salesReps]);

  const handleRepNameChange = (index: number, newName: string) => {
    const oldName = salesReps[index].name;
    
    // Update sales reps
    const newSalesReps = [...salesReps];
    newSalesReps[index] = { ...newSalesReps[index], name: newName };
    setSalesReps(newSalesReps);
    
    // Update visibility mapping
    const newVisibility = { ...repVisibility };
    delete newVisibility[oldName];
    newVisibility[newName] = repVisibility[oldName] ?? true;
    setRepVisibility(newVisibility);
    
    // Update weekly data keys
    const newWeeklyData = weeklyData.map(week => {
      const newWeek = { ...week };
      Object.keys(METRIC_LABELS).forEach(metric => {
        const oldKey = `${oldName}-${metric}`;
        const newKey = `${newName}-${metric}`;
        if (newWeek[oldKey] !== undefined) {
          newWeek[newKey] = newWeek[oldKey];
          delete newWeek[oldKey];
        }
      });
      return newWeek;
    });
    setWeeklyData(newWeeklyData);
  };

  const handleDataChange = (repName: string, metric: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    const key = `${repName}-${metric}`;
    
    const newWeeklyData = [...weeklyData];
    newWeeklyData[selectedWeekIndex] = {
      ...newWeeklyData[selectedWeekIndex],
      [key]: numValue
    };
    setWeeklyData(newWeeklyData);
  };

  const toggleRepVisibility = (repName: string) => {
    setRepVisibility(prev => ({
      ...prev,
      [repName]: !prev[repName]
    }));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Activity': 'border-blue-200 bg-blue-50',
      'Engagement': 'border-green-200 bg-green-50', 
      'Conversion': 'border-emerald-200 bg-emerald-50',
      'Efficiency': 'border-purple-200 bg-purple-50'
    };
    return colors[category as keyof typeof colors] || 'border-gray-200 bg-gray-50';
  };

  const getCategoryTextColor = (category: string) => {
    const colors = {
      'Activity': 'text-blue-800',
      'Engagement': 'text-green-800',
      'Conversion': 'text-emerald-800', 
      'Efficiency': 'text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'text-gray-800';
  };

  const renderCurrentDashboard = () => {
    const metric = currentDashboardConfig.metric;
    const categoryColor = getCategoryColor(currentDashboardConfig.category);
    const categoryTextColor = getCategoryTextColor(currentDashboardConfig.category);

    return (
      <div className="space-y-6">
        <Card className={`${categoryColor} border-2`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className={`text-2xl ${categoryTextColor}`}>
                  {currentDashboardConfig.title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {currentDashboardConfig.description}
                </CardDescription>
              </div>
              <Badge variant="outline" className={`${categoryTextColor} border-current`}>
                {currentDashboardConfig.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {salesReps.map(rep => 
                    repVisibility[rep.name] && (
                      <Line
                        key={rep.name}
                        type="monotone"
                        dataKey={`${rep.name}-${metric}`}
                        stroke={rep.color}
                        strokeWidth={2}
                        dot={{ fill: rep.color, strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    )
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sales Rep Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Representatives</CardTitle>
            <CardDescription>Manage visibility and edit names</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {salesReps.map((rep, index) => (
                <div key={rep.name} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    checked={repVisibility[rep.name]}
                    onCheckedChange={() => toggleRepVisibility(rep.name)}
                  />
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: rep.color }}
                  />
                  <Input
                    value={rep.name}
                    onChange={(e) => handleRepNameChange(index, e.target.value)}
                    className="flex-1"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Week Timeline */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Week Selection</CardTitle>
                <CardDescription>
                  {isCurrentWeek ? 'Current Week (Editable)' : 'Historical Data'}
                  {!isCurrentWeek && (
                    <Badge variant="outline" className="ml-2 text-orange-600 border-orange-300">
                      Historical
                    </Badge>
                  )}
                </CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowTimeline(!showTimeline)}
              >
                {showTimeline ? 'Hide Timeline' : 'Show Timeline'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedWeekIndex(Math.max(0, selectedWeekIndex - 1))}
                disabled={selectedWeekIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <div className="text-center">
                <div className="font-medium">{currentWeek.weekPeriod}</div>
                <div className="text-sm text-muted-foreground">
                  Week {selectedWeekIndex + 1} of {weeklyData.length}
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedWeekIndex(Math.min(weeklyData.length - 1, selectedWeekIndex + 1))}
                disabled={selectedWeekIndex === weeklyData.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {showTimeline && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                {weeklyData.map((week, index) => (
                  <Button
                    key={week.weekPeriod}
                    variant={index === selectedWeekIndex ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedWeekIndex(index)}
                    className="text-xs"
                  >
                    {week.weekPeriod}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Data Entry Table */}
        <Card>
          <CardHeader>
            <CardTitle>Data Entry - {currentWeek.weekPeriod}</CardTitle>
            <CardDescription>
              {METRIC_LABELS[metric as keyof typeof METRIC_LABELS]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sales Rep</TableHead>
                  <TableHead>{METRIC_LABELS[metric as keyof typeof METRIC_LABELS]}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesReps.map(rep => {
                  const key = `${rep.name}-${metric}`;
                  const currentValue = currentWeek[key] || 0;
                  return (
                    <TableRow key={rep.name}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: rep.color }}
                          />
                          <span>{rep.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={currentValue}
                          onChange={(e) => handleDataChange(rep.name, metric, e.target.value)}
                          className="w-24"
                          step="0.1"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Navigation */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Sales Performance Dashboard</h1>
              <Tabs value={selectedDashboard} onValueChange={setSelectedDashboard}>
                                 <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-6">
                   {DASHBOARD_CONFIGS.map(config => (
                     <TabsTrigger key={config.id} value={config.id} className="text-xs">
                       {config.title}
                     </TabsTrigger>
                   ))}
                </TabsList>
                
                {DASHBOARD_CONFIGS.map(config => (
                  <TabsContent key={config.id} value={config.id}>
                    {renderCurrentDashboard()}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 