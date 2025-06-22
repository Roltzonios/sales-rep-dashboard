'use client';

import React from 'react';
import DashboardLayout from '../../components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from "../../../@/components/ui/card";
import { TrendingUp, BarChart3, PieChart, Activity } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600 mt-2">Advanced analytics and insights for your sales performance</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Performance Trends</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12.5%</div>
              <p className="text-xs text-muted-foreground">
                Overall improvement this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.3%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Efficiency</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                Above target threshold
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activity Score</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2</div>
              <p className="text-xs text-muted-foreground">
                +5.3 points this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                This section will contain detailed analytics features including:
              </p>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li>• Predictive performance modeling</li>
                <li>• Advanced trend analysis</li>
                <li>• Custom metric calculations</li>
                <li>• Comparative team analysis</li>
                <li>• Goal tracking and forecasting</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Comprehensive insights and recommendations based on your sales data patterns.
              </p>
              <div className="mt-4 space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">Top Performer</p>
                  <p className="text-xs text-blue-600">JP leads in conversion rates this month</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">Improvement Opportunity</p>
                  <p className="text-xs text-green-600">Call efficiency can be optimized by 15%</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800 font-medium">Trend Alert</p>
                  <p className="text-xs text-purple-600">Lead quality showing upward trend</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
} 