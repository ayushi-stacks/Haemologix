"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Users, Building, Activity, TrendingUp, AlertTriangle, CheckCircle, XCircle, Search, Filter, Download, Settings, BarChart3, Globe, Clock } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [systemStats, setSystemStats] = useState({
    totalUsers: 25847,
    activeDonors: 18234,
    registeredHospitals: 156,
    activeAlerts: 23,
    totalDonations: 12456,
    responseRate: 72,
    systemUptime: 99.9,
    criticalAlerts: 5,
  })
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: "alert_created",
      message: "City General Hospital created critical O+ alert",
      timestamp: "2 minutes ago",
      severity: "high",
    },
    {
      id: 2,
      type: "donor_response",
      message: "15 donors responded to emergency alert #1234",
      timestamp: "5 minutes ago",
      severity: "medium",
    },
    {
      id: 3,
      type: "hospital_registered",
      message: "St. Mary's Medical Center completed registration",
      timestamp: "1 hour ago",
      severity: "low",
    },
    {
      id: 4,
      type: "system_alert",
      message: "Blood inventory critically low in 3 hospitals",
      timestamp: "2 hours ago",
      severity: "high",
    },
  ])
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      role: "donor",
      bloodType: "O+",
      status: "Active",
      lastActivity: "2 hours ago",
      totalDonations: 8,
    },
    {
      id: 2,
      name: "City General Hospital",
      email: "admin@citygeneral.com",
      role: "hospital",
      licenseNumber: "HOS-2024-001",
      status: "Verified",
      lastActivity: "15 minutes ago",
      totalAlerts: 45,
    },
    {
      id: 3,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "donor",
      bloodType: "A+",
      status: "Active",
      lastActivity: "1 day ago",
      totalDonations: 12,
    },
  ])
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: "City General Hospital",
      email: "admin@citygeneral.com",
      licenseNumber: "HOS-2024-001",
      type: "Government",
      status: "Verified",
      totalAlerts: 45,
      responseRate: 78,
      location: "Downtown",
    },
    {
      id: 2,
      name: "St. Mary's Medical Center",
      email: "contact@stmarys.com",
      licenseNumber: "HOS-2024-002",
      type: "Private",
      status: "Pending",
      totalAlerts: 23,
      responseRate: 65,
      location: "North Side",
    },
  ])
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "admin") {
      router.push("/auth/login")
      return
    }

    setUser(parsedUser)
  }, [router])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "alert_created":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "donor_response":
        return <Users className="w-4 h-4 text-green-500" />
      case "hospital_registered":
        return <Building className="w-4 h-4 text-blue-500" />
      case "system_alert":
        return <Activity className="w-4 h-4 text-orange-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
      case "Verified":
        return <Badge className="bg-green-600 text-white">{status}</Badge>
      case "Pending":
        return <Badge className="bg-yellow-600 text-white">{status}</Badge>
      case "Suspended":
        return <Badge className="bg-red-600 text-white">{status}</Badge>
      default:
        return <Badge variant="outline" className="bg-white/20 text-white border-white/30">{status}</Badge>
    }
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-900 to-yellow-600 flex flex-col relative overflow-hidden">
      <img src='https://fbe.unimelb.edu.au/__data/assets/image/0006/3322347/varieties/medium.jpg' className='w-full h-full object-cover absolute mix-blend-overlay'/>
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 shadow-lg relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">System Administration</h1>
                <p className="text-sm text-gray-200">BloodConnect Management Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Settings className="w-4 h-4 mr-2" />
                System Settings
              </Button>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* System Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{systemStats.totalUsers.toLocaleString()}</p>
                  <p className="text-sm text-gray-200">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{systemStats.activeDonors.toLocaleString()}</p>
                  <p className="text-sm text-gray-200">Active Donors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{systemStats.registeredHospitals}</p>
                  <p className="text-sm text-gray-200">Hospitals</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{systemStats.activeAlerts}</p>
                  <p className="text-sm text-gray-200">Active Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                System Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-200">
              <div className="flex justify-between">
                <span>System Uptime</span>
                <span className="font-semibold text-green-400">{systemStats.systemUptime}%</span>
              </div>
              <div className="flex justify-between">
                <span>Response Rate</span>
                <span className="font-semibold text-white">{systemStats.responseRate}%</span>
              </div>
              <div className="flex justify-between">
                <span>Total Donations</span>
                <span className="font-semibold text-white">{systemStats.totalDonations.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Globe className="w-5 h-5 text-blue-400" />
                Geographic Coverage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-200">
              <div className="flex justify-between">
                <span>Cities Covered</span>
                <span className="font-semibold text-white">50+</span>
              </div>
              <div className="flex justify-between">
                <span>Average Coverage Radius</span>
                <span className="font-semibold text-white">15 km</span>
              </div>
              <div className="flex justify-between">
                <span>Rural Areas</span>
                <span className="font-semibold text-white">25%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-orange-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.slice(0, 3).map((activity) => (
                <div key={activity.id} className={`border-l-2 pl-3 ${getSeverityColor(activity.severity)}`}>
                  <div className="flex items-start gap-2">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{activity.message}</p>
                      <p className="text-xs text-gray-300">{activity.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-yellow-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300">User Management</TabsTrigger>
            <TabsTrigger value="hospitals" className="text-white data-[state=active]:bg-yellow-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300">Hospital Verification</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-yellow-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300">System Analytics</TabsTrigger>
            <TabsTrigger value="activity" className="text-white data-[state=active]:bg-yellow-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300">Activity Logs</TabsTrigger>
          </TabsList>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">User Management</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search users..." className="pl-10 w-64 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-yellow-600" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32 bg-white/5 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white border-gray-700">
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="donor">Donors</SelectItem>
                    <SelectItem value="hospital">Hospitals</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5 border-b border-white/20">
                      <tr>
                        <th className="text-left p-4 font-medium text-white">User</th>
                        <th className="text-left p-4 font-medium text-white">Role</th>
                        <th className="text-left p-4 font-medium text-white">Status</th>
                        <th className="text-left p-4 font-medium text-white">Last Activity</th>
                        <th className="text-left p-4 font-medium text-white">Stats</th>
                        <th className="text-left p-4 font-medium text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition-all duration-300">
                          <td className="p-4">
                            <div>
                              <p className="font-medium text-white">{user.name}</p>
                              <p className="text-sm text-gray-300">{user.email}</p>
                              {user.bloodType && (
                                <Badge variant="outline" className="mt-1 bg-white/5 border-white/20 text-white">
                                  {user.bloodType}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="capitalize bg-white/5 border-white/20 text-white">
                              {user.role}
                            </Badge>
                          </td>
                          <td className="p-4">{getStatusBadge(user.status)}</td>
                          <td className="p-4 text-sm text-gray-300">{user.lastActivity}</td>
                          <td className="p-4 text-sm text-gray-300">
                            {user.role === "donor" ? (
                              <span>{user.totalDonations} donations</span>
                            ) : (
                              <span>{user.totalAlerts} alerts</span>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/20 text-slate-700">
                                View
                              </Button>
                              <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/20 text-slate-700">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 bg-transparent border-red-600 hover:bg-red-600/20">
                                Suspend
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hospital Verification Tab */}
          <TabsContent value="hospitals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Hospital Verification</h2>
              <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Filter className="w-4 h-4 mr-2" />
                Filter by Status
              </Button>
            </div>

            <div className="space-y-4">
              {hospitals.map((hospital) => (
                <Card key={hospital.id} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{hospital.name}</h3>
                          {getStatusBadge(hospital.status)}
                          <Badge variant="outline" className="bg-white/5 border-white/20 text-white">{hospital.type}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300 mb-4">
                          <div>
                            <span className="font-medium text-white">Email:</span> {hospital.email}
                          </div>
                          <div>
                            <span className="font-medium text-white">License:</span> {hospital.licenseNumber}
                          </div>
                          <div>
                            <span className="font-medium text-white">Location:</span> {hospital.location}
                          </div>
                          <div>
                            <span className="font-medium text-white">Response Rate:</span> {hospital.responseRate}%
                          </div>
                        </div>
                        <div className="flex gap-3">
                          {hospital.status === "Pending" ? (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve
                              </Button>
                              <Button variant="outline" size="sm" className="bg-transparent hover:bg-red-600/20 border-red-950 text-red-950">
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/20 text-slate-900">
                                View Details
                              </Button>
                              <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/20 text-slate-900">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="bg-transparent hover:bg-red-600/20 text-red-950 border-red-950">
                                Suspend
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* System Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">System Analytics</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <BarChart3 className="w-5 h-5 text-yellow-400" />
                    Platform Usage Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-200">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Daily Active Users</span>
                      <span className="font-semibold text-white">8,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Active Users</span>
                      <span className="font-semibold text-white">18,456</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Session Duration</span>
                      <span className="font-semibold text-white">12 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mobile Users</span>
                      <span className="font-semibold text-white">65%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50">
                <CardHeader>
                  <CardTitle className="text-white">Emergency Response Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-200">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Average Response Time</span>
                      <span className="font-semibold text-white">8.5 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate</span>
                      <span className="font-semibold text-white">89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Critical Alerts Resolved</span>
                      <span className="font-semibold text-white">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lives Saved (Est.)</span>
                      <span className="font-semibold text-white">2,456</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Logs Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">System Activity Logs</h2>
              <div className="flex gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40 bg-white/5 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white border-gray-700">
                    <SelectItem value="all">All Activities</SelectItem>
                    <SelectItem value="alerts">Alerts</SelectItem>
                    <SelectItem value="registrations">Registrations</SelectItem>
                    <SelectItem value="system">System Events</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Download className="w-4 h-4 mr-2" />
                  Export Logs
                </Button>
              </div>
            </div>

            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className={`border-l-4 pl-4 py-3 ${getSeverityColor(activity.severity)}`}>
                      <div className="flex items-start gap-3">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="font-medium text-white">{activity.message}</p>
                          <p className="text-sm text-gray-300">{activity.timestamp}</p>
                        </div>
                        <Badge variant="outline" className="capitalize bg-white/5 border-white/20 text-white">
                          {activity.type.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
