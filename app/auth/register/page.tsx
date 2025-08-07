"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Heart, Mail, Lock, Phone, Building, AlertCircle, CheckCircle } from 'lucide-react'
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState("")
  const [formData, setFormData] = useState({
    // Common fields
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",

    // Donor specific
    name: "",
    age: "",
    bloodType: "",
    address: "",
    city: "",
    lastDonation: "",
    medicalConditions: "",

    // Hospital specific
    hospitalName: "",
    licenseNumber: "",
    contactPerson: "",
    hospitalType: "",
    capacity: "",
    services: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const roleParam = searchParams.get("role")
    if (roleParam) {
      setRole(roleParam)
    }
  }, [searchParams])

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  const hospitalTypes = ["Government", "Private", "Charitable", "Military", "Specialty"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (role === "donor" && (!formData.name || !formData.bloodType || !formData.age)) {
      setError("Please fill in all required donor information")
      setLoading(false)
      return
    }

    if (role === "hospital" && (!formData.hospitalName || !formData.licenseNumber || !formData.contactPerson)) {
      setError("Please fill in all required hospital information")
      setLoading(false)
      return
    }

    // Simulate registration
    setTimeout(() => {
      setSuccess("Registration successful! Redirecting to login...")

      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)

      setLoading(false)
    }, 1500)
  }

  const nextStep = () => {
    if (step === 1 && !role) {
      setError("Please select a role")
      return
    }
    if (step === 2 && (!formData.email || !formData.password || !formData.phone)) {
      setError("Please fill in all basic information")
      return
    }
    setError("")
    setStep(step + 1)
  }

  const prevStep = () => {
    setError("")
    setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-900 to-yellow-600 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-[rgba(127,29,29,1)]" />
          </div>
          <h1 className="text-3xl font-bold text-slate-300">Join HaemoLogix</h1>
          <p className="text-slate-300/80 mt-2">Create your account to start saving lives</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= i ? "bg-yellow-600 text-red-900" : "bg-slate-300/20 text-slate-300/60"
                }`}
              >
                {step > i ? <CheckCircle className="w-4 h-4" /> : i}
              </div>
              {i < 3 && <div className={`w-12 h-1 mx-2 ${step > i ? "bg-yellow-600" : "bg-slate-300/20"}`} />}
            </div>
          ))}
        </div>

        <Card className="backdrop-blur-sm bg-slate-300/20 rounded-md border border-slate-300/40 p-8 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-[rgba(202,138,4,1)]">
              {step === 1 && "Choose Your Role"}
              {step === 2 && "Basic Information"}
              {step === 3 && "Complete Your Profile"}
            </CardTitle>
            <CardDescription className="text-center text-slate-300">
              {step === 1 && "Select how you want to use HaemoLogix"}
              {step === 2 && "Enter your contact details"}
              {step === 3 && "Provide additional information for verification"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="bg-red-900/20 text-red-300 border-yellow-600">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-yellow-600/40 bg-yellow-600/10">
                <CheckCircle className="h-4 w-4 text-yellow-300" />
                <AlertDescription className="text-yellow-200">{success}</AlertDescription>
              </Alert>
            )}

            {/* Step 1: Role Selection */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid gap-4">
                  <Card
                    className={`cursor-pointer transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 ${
                      role === "donor" ? "border-yellow-600 bg-yellow-600/10 shadow-lg" : "border-gray-200 hover:shadow-yellow-500 hover:shadow-lg"
                    }`}
                    onClick={() => setRole("donor")}
                  >
                    <CardContent className="p-6 bg-slate-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                          <Heart className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[rgba(127,29,29,1)]">Blood Donor</h3>
                          <p className="text-gray-600">Register to donate blood and receive emergency alerts</p>
                        </div>
                        {role === "donor" && <Badge className="ml-auto bg-yellow-600 text-red-900">Selected</Badge>}
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 mb-[33px] ${
                      role === "hospital" ? "border-yellow-600 bg-yellow-600/10 shadow-lg" : "border-gray-200 hover:shadow-yellow-500 hover:shadow-lg"
                    }`}
                    onClick={() => setRole("hospital")}
                  >
                    <CardContent className="p-6 bg-slate-200 mb-0">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[rgba(228,207,180,1)]">
                          <Building className="w-6 h-6 text-[rgba(202,138,4,1)]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[rgba(127,29,29,1)]">Hospital / Blood Bank</h3>
                          <p className="text-gray-600">Manage blood inventory and create emergency alerts</p>
                        </div>
                        {role === "hospital" && <Badge className="ml-auto bg-yellow-600 text-red-900">Selected</Badge>}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button onClick={nextStep} className="w-full bg-yellow-600 hover:bg-yellow-500 text-red-900 mt-0">
                  Continue
                </Button>
              </div>
            )}

            {/* Step 2: Basic Information */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-800">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 rounded-xl border-gray-300 focus:border-yellow-600 focus:ring-yellow-600"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-800">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone"
                        className="pl-10 rounded-xl border-gray-300 focus:border-yellow-600 focus:ring-yellow-600"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-800">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create password"
                        className="pl-10 rounded-xl border-gray-300 focus:border-yellow-600 focus:ring-yellow-600"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-800">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        className="pl-10 rounded-xl border-gray-300 focus:border-yellow-600 focus:ring-yellow-600"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={prevStep} className="flex-1 bg-transparent border border-slate-300/40 text-slate-300 hover:bg-slate-300/10 hover:text-yellow-600">
                    Back
                  </Button>
                  <Button onClick={nextStep} className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-red-900">
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Role-specific Information */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {role === "donor" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-800">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="rounded-xl border-gray-300 focus:border-yellow-600 focus:ring-yellow-600"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-gray-800">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="Enter your age"
                          min="18"
                          max="65"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          className="rounded-xl border-gray-300 focus:border-yellow-600 focus:ring-yellow-600"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bloodType" className="text-gray-800">Blood Type</Label>
                        <Select
                          value={formData.bloodType}
                          onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
                        >
                          <SelectTrigger className="rounded-xl border-gray-300 focus:border-yellow-600 focus:ring-yellow-600">
                            <SelectValue placeholder="Select blood type" />
                          </SelectTrigger>
                          <SelectContent>
                            {bloodTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastDonation" className="text-gray-800">Last Donation Date</Label>
                        <Input
                          id="lastDonation"
                          type="date"
                          value={formData.lastDonation}
                          onChange={(e) => setFormData({ ...formData, lastDonation: e.target.value })}
                          className="rounded-xl border-gray-300 focus:border-yellow-600 focus:ring-yellow-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-800">Address</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your complete address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="rounded-xl border-gray-300 focus:border-yellow-600 focus:ring-yellow-600 resize-none"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medicalConditions" className="text-gray-800">Medical Conditions (Optional)</Label>
                      <Textarea
                        id="medicalConditions"
                        placeholder="Any medical conditions or medications"
                        value={formData.medicalConditions}
                        onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                        className="rounded-xl border-gray-300 focus:border-yellow-600 focus:ring-yellow-600 resize-none"
                      />
                    </div>
                  </>
                )}

                {role === "hospital" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hospitalName" className="text-gray-800">Hospital/Blood Bank Name</Label>
                        <Input
                          id="hospitalName"
                          placeholder="Enter institution name"
                          value={formData.hospitalName}
                          onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                          className="rounded-xl border-gray-300 focus:border-yellow-600 focus:ring-yellow-600"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="licenseNumber" className="text-gray-800">License Number</Label>
                        <Input
                          id="licenseNumber"
                          placeholder="Enter license number"
                          value={formData.licenseNumber}
                          onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                          className="rounded-xl border-gray-300 focus:border-yellow-600 focus:ring-yellow-600"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson" className="text-gray-800">Contact Person</Label>
                        <Input
                          id="contactPerson"
                          placeholder="Primary contact name"
                          value={formData.contactPerson}
                          onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                          className="rounded-xl border-gray-300 focus:border-yellow-600 focus:ring-yellow-600"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hospitalType" className="text-gray-800">Institution Type</Label>
                        <Select
                          value={formData.hospitalType}
                          onValueChange={(value) => setFormData({ ...formData, hospitalType: value })}
                        >
                          <SelectTrigger className="rounded-xl border-gray-300 focus:border-yellow-600 focus:ring-yellow-600">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {hospitalTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="capacity" className="text-gray-800">Bed Capacity</Label>
                        <Input
                          id="capacity"
                          type="number"
                          placeholder="Number of beds"
                          value={formData.capacity}
                          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                          className="rounded-xl border-gray-300 focus:border-yellow-600 focus:ring-yellow-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-gray-800">City</Label>
                        <Input
                          id="city"
                          placeholder="Enter city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="rounded-xl border-gray-300 focus:border-yellow-600 focus:ring-yellow-600"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="services" className="text-gray-800">Services Offered</Label>
                      <Textarea
                        id="services"
                        placeholder="List of medical services and specialties"
                        value={formData.services}
                        onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                        className="rounded-xl border-gray-300 focus:border-yellow-600 focus:ring-yellow-600 resize-none"
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1 bg-transparent border border-slate-300/40 text-slate-300 hover:bg-slate-300/10 hover:text-yellow-600">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-red-900" disabled={loading}>
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
              </form>
            )}

            {step < 3 && (
              <div className="text-center">
                <p className="text-sm text-slate-300">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="hover:underline font-medium text--300 text-[rgba(127,29,29,1)]">
                    Sign in
                  </Link>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm hover:text-slate-200 text-slate-400">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
