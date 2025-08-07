"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Mail, Lock, AlertCircle } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate authentication
    setTimeout(() => {
      if (formData.email && formData.password && formData.role) {
        // Store user data in localStorage for demo
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: formData.email,
            role: formData.role,
            name: formData.email.split("@")[0],
            id: Math.random().toString(36).substr(2, 9),
          }),
        )

        // Redirect based on role
        switch (formData.role) {
          case "donor":
            router.push("/donor")
            break
          case "hospital":
            router.push("/hospital")
            break
          case "admin":
            router.push("/admin")
            break
          default:
            router.push("/donor")
        }
      } else {
        setError("Please fill in all fields")
      }
      setLoading(false)
    }, 1000)
  }

  const handleDemoLogin = (role: string) => {
    const demoUsers = {
      donor: { email: "donor@demo.com", name: "John Donor", bloodType: "O+" },
      hospital: { email: "hospital@demo.com", name: "City General Hospital" },
      admin: { email: "admin@demo.com", name: "System Admin" },
    }

    const user = demoUsers[role as keyof typeof demoUsers]
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        role,
        id: Math.random().toString(36).substr(2, 9),
      }),
    )

    router.push(`/${role}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-900 to-yellow-600 flex items-center justify-center p-4 relative overflow-hidden">
      <img src='https://fbe.unimelb.edu.au/__data/assets/image/0006/3322347/varieties/medium.jpg' className='w-full h-full object-cover absolute mix-blend-overlay'/>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-300 mt-2">Sign in to your BloodConnect account</p>
        </div>

        <Card className="backdrop-blur-sm bg-slate-300/20 rounded-md border border-slate-300/40 p-8 shadow-2xl hover:shadow-yellow-600 hover:shadow-lg transition-all duration-300">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">Sign In</CardTitle>
            <CardDescription className="text-center text-gray-300">Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 bg-white/10 text-white border-gray-600 placeholder:text-gray-400 focus-visible:ring-yellow-600"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 bg-white/10 text-white border-gray-600 placeholder:text-gray-400 focus-visible:ring-yellow-600"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-white">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger className="bg-white/10 text-white border-gray-600 focus:ring-yellow-600">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white border-gray-700">
                    <SelectItem value="donor" className="hover:bg-gray-700">Blood Donor</SelectItem>
                    <SelectItem value="hospital" className="hover:bg-gray-700">Hospital/Blood Bank</SelectItem>
                    <SelectItem value="admin" className="hover:bg-gray-700">System Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-red-800 hover:bg-red-900 transition-colors duration-300" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-300/20 px-2 text-gray-300">Or try demo accounts</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" onClick={() => handleDemoLogin("donor")} className="text-xs bg-white/10 text-white border-gray-600 hover:bg-white/20 hover:text-white">
                Demo Donor
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDemoLogin("hospital")} className="text-xs bg-white/10 text-white border-gray-600 hover:bg-white/20 hover:text-white">
                Demo Hospital
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDemoLogin("admin")} className="text-xs bg-white/10 text-white border-gray-600 hover:bg-white/20 hover:text-white">
                Demo Admin
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-300">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-yellow-500 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-300 hover:text-yellow-500">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
