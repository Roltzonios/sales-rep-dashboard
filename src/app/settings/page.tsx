'use client';

import React from 'react';
import DashboardLayout from '../../components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from "../../../@/components/ui/card";
import { Button } from "../../../@/components/ui/button";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import { Separator } from "../../../@/components/ui/separator";
import { Settings, User, Bell, Shield, Database, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
            <p className="text-slate-600 mt-2">Manage your dashboard preferences and configuration</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    <button className="w-full text-left p-2 rounded-lg bg-blue-50 text-blue-700 flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </button>
                    <button className="w-full text-left p-2 rounded-lg hover:bg-slate-50 flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                    </button>
                    <button className="w-full text-left p-2 rounded-lg hover:bg-slate-50 flex items-center space-x-2">
                      <Database className="h-4 w-4" />
                      <span>Data</span>
                    </button>
                    <button className="w-full text-left p-2 rounded-lg hover:bg-slate-50 flex items-center space-x-2">
                      <Palette className="h-4 w-4" />
                      <span>Appearance</span>
                    </button>
                    <button className="w-full text-left p-2 rounded-lg hover:bg-slate-50 flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Security</span>
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Profile Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Profile Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" placeholder="Sales Manager" disabled />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              {/* Dashboard Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Default Dashboard View</p>
                      <p className="text-sm text-slate-600">Choose which dashboard loads by default</p>
                    </div>
                    <select className="border rounded-lg px-3 py-2">
                      <option>Number of Hours</option>
                      <option>Call Logs</option>
                      <option>Accounts Touched</option>
                      <option>Spoke With</option>
                    </select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-refresh Data</p>
                      <p className="text-sm text-slate-600">Automatically refresh dashboard data</p>
                    </div>
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Timeline by Default</p>
                      <p className="text-sm text-slate-600">Display timeline selector on page load</p>
                    </div>
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>

              {/* Team Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-slate-600">Manage your sales team members and their access levels.</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">JP</p>
                          <p className="text-sm text-slate-600">Sales Representative</p>
                        </div>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Kayla</p>
                          <p className="text-sm text-slate-600">Sales Representative</p>
                        </div>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Ken</p>
                          <p className="text-sm text-slate-600">Sales Representative</p>
                        </div>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                    
                    <Button className="w-full">Add Team Member</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 