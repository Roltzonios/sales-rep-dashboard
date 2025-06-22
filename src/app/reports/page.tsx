'use client';

import React from 'react';
import DashboardLayout from '../../components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from "../../../@/components/ui/card";
import { Button } from "../../../@/components/ui/button";
import { FileText, Download, Calendar, Filter } from "lucide-react";

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
            <p className="text-slate-600 mt-2">Generate and manage your sales performance reports</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Button className="h-16 flex flex-col items-center justify-center space-y-2">
              <FileText className="h-5 w-5" />
              <span className="text-sm">Weekly Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Monthly Summary</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
              <Filter className="h-5 w-5" />
              <span className="text-sm">Custom Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
              <Download className="h-5 w-5" />
              <span className="text-sm">Export Data</span>
            </Button>
          </div>

          {/* Recent Reports */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Weekly Performance - Dec 15-22</p>
                      <p className="text-sm text-slate-600">Generated 2 hours ago</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Monthly Summary - November</p>
                      <p className="text-sm text-slate-600">Generated 1 day ago</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Team Comparison - Q4</p>
                      <p className="text-sm text-slate-600">Generated 3 days ago</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Performance Overview</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      Comprehensive overview of all key metrics and trends
                    </p>
                    <Button size="sm" className="w-full">Generate Report</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Individual Analysis</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      Detailed breakdown by sales representative
                    </p>
                    <Button size="sm" variant="outline" className="w-full">Generate Report</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Goal Tracking</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      Progress tracking against set targets and goals
                    </p>
                    <Button size="sm" variant="outline" className="w-full">Generate Report</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scheduled Reports */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Weekly Dashboard</h4>
                  <p className="text-sm text-blue-700 mb-2">Every Monday at 9:00 AM</p>
                  <p className="text-xs text-blue-600">Next: Dec 25, 2023</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Monthly Summary</h4>
                  <p className="text-sm text-green-700 mb-2">First day of each month</p>
                  <p className="text-xs text-green-600">Next: Jan 1, 2024</p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">Quarterly Review</h4>
                  <p className="text-sm text-purple-700 mb-2">End of each quarter</p>
                  <p className="text-xs text-purple-600">Next: Mar 31, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
} 