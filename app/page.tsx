"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Users, Bell, Shield, Activity, Globe } from 'lucide-react'
import Link from "next/link"

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: Bell,
      title: "Real-Time Alerts",
      description: "Instant notifications when blood is critically needed in your area",
    },
    {
      icon: MapPin,
      title: "Geolocation Matching",
      description: "Find eligible donors within customizable radius using advanced geospatial queries",
    },
    {
      icon: Users,
      title: "Multi-Role Dashboard",
      description: "Separate interfaces for donors, hospitals, and administrators",
    },
    {
      icon: Shield,
      title: "Secure & Verified",
      description: "OTP verification, data encryption, and role-based access control",
    },
  ]

  const stats = [
    { label: "Lives Saved", value: "10,000+", icon: Heart },
    { label: "Active Donors", value: "25,000+", icon: Users },
    { label: "Partner Hospitals", value: "150+", icon: Activity },
    { label: "Cities Covered", value: "50+", icon: Globe },
  ]

  return (
    <div className="min-h-screen bg-red-900">
      {/* Header */}
      <header className="backdrop-blur-lg sticky top-4 mx-4 md:mx-8 lg:mx-16 z-50 border border-yellow-600/40 rounded-2xl shadow-lg px-6 py-3 flex justify-between items-center bg-transparent">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-px rounded bg-transparent">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-300">
              <Heart className="w-6 h-6 text-[rgba(127,29,29,1)]" />
            </div>
            <span className="text-xl font-bold text-slate-300">{"HaemoLogix"}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="hover:text-yellow-600 transition-colors text-slate-300">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-yellow-600 transition-colors text-slate-300">
              How It Works
            </Link>
            <Link href="/contact" className="hover:text-yellow-600 transition-colors text-slate-300">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button className="bg-slate-300 text-[rgba(127,29,29,1)]" variant="outline">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="hover:bg-yellow-600 text-slate-300 border-solid bg-red-900 border border-[rgba(154,117,31,1)]">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-red-900 via-red-900 to-yellow-600">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 hover:bg-red-100 text-[rgba(127,29,29,1)] bg-[rgba(204,165,165,1)]">
            🚨 Emergency Blood Donation Platform
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-[rgba(154,117,31,1)]">
            Save Lives with
            <span className="block text-slate-300">Real-Time Blood Alerts</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-[rgba(159,119,31,1)]">
            Connect hospitals in critical need with eligible donors instantly. Our platform uses geolocation matching
            and real-time notifications to mobilize donors when every second counts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/register?role=donor">
              <Button size="lg" className="hover:bg-zinc-50 text-lg px-8 py-3 bg-slate-300 text-[rgba(154,117,31,1)]">
                <Heart className="w-5 h-5 mr-2" />
                Become a Donor
              </Button>
            </Link>
            <Link href="/auth/register?role=hospital">
              <Button size="lg" className="hover:bg-yellow-600 text-lg px-8 py-3 bg-transparent text-slate-300 border-slate-300 border border-dashed">
                <Activity className="w-5 h-5 mr-2" />
                Hospital Registration
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-[rgba(127,29,29,1)]" />
                  <div className="text-2xl font-bold text-[rgba(154,117,31,1)]">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gradient-to-tr from-red-900 via-red-900 to-yellow-600">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-300 border-0">Powerful Features</h2>
            <p className="text-xl max-w-2xl mx-auto text-[rgba(155,144,157,1)]">
              Advanced technology meets humanitarian mission to create the most efficient blood donation network.
            </p>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-300 h-32 backdrop-blur-md bg-slate-300/30 border border-slate-300/40 shadow-lg hover:shadow-yellow-600/50 hover:shadow-2xl hover:border-yellow-600/60 ${
                    activeFeature === index ? "border-red-500 shadow-lg bg-slate-300/40" : ""
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardContent className="p-4 h-full flex flex-col">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm bg-slate-400/60 text-gray-800">
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold mb-1 text-slate-300">{feature.title}</h3>
                        <p className="text-xs leading-tight text-[rgba(155,148,162,1)]">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gradient-to-bl from-red-900 via-red-900 to-yellow-600 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-300">How It Works</h2>
            <p className="text-xl text-slate-300/80">Simple steps to save lives in critical moments.</p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Animated connector lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              {/* Step 1 to 2 */}
              <path
                d="M 200 120 Q 300 80 400 120"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                fill="none"
                className="animate-pulse"
                strokeDasharray="10,5"
              />
              {/* Step 2 to 3 */}
              <path
                d="M 400 120 Q 500 160 600 120"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                fill="none"
                className="animate-pulse"
                strokeDasharray="10,5"
                style={{ animationDelay: '0.5s' }}
              />
              {/* Step 3 to 4 */}
              <path
                d="M 600 120 Q 700 80 800 120"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                fill="none"
                className="animate-pulse"
                strokeDasharray="10,5"
                style={{ animationDelay: '1s' }}
              />
              {/* Step 4 to 5 */}
              <path
                d="M 800 120 Q 900 160 1000 120"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                fill="none"
                className="animate-pulse"
                strokeDasharray="10,5"
                style={{ animationDelay: '1.5s' }}
              />
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative" style={{ zIndex: 2 }}>
              {[
                {
                  step: "1",
                  icon: "🏥",
                  title: "Emergency Request",
                  description: "Hospital raises an emergency request when a blood type is critically low",
                  delay: "0s"
                },
                {
                  step: "2",
                  icon: "🔔",
                  title: "Instant Alerts",
                  description: "HaemoLogix instantly alerts nearby eligible donors (correct blood group, donation gap maintained)",
                  delay: "0.3s"
                },
                {
                  step: "3",
                  icon: "📱",
                  title: "Donor Response",
                  description: "Donors accept requests via SMS, email, or app notification",
                  delay: "0.6s"
                },
                {
                  step: "4",
                  icon: "👁️",
                  title: "Live Tracking",
                  description: "Hospital sees live donor responses and can request units from nearby hospitals if needed",
                  delay: "0.9s"
                },
                {
                  step: "5",
                  icon: "❤️",
                  title: "Lives Saved",
                  description: "Request fulfilled quickly, saving valuable time and lives",
                  delay: "1.2s"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${item.delay} both`
                  }}
                >
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full backdrop-blur-md bg-yellow-600/40 border border-yellow-600/60 shadow-lg flex items-center justify-center text-3xl transition-all duration-300 group-hover:shadow-slate-300/50 group-hover:shadow-2xl group-hover:bg-yellow-600/60 group-hover:scale-110">
                      <span className="filter drop-shadow-lg">{item.icon}</span>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-yellow-600/80 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm border-2 border-yellow-500">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-300 mb-3 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300/80 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* Partners & Community Section */}
      <section className="py-30 px-4 bg-gradient-to-tl from-red-900 via-red-900 to-yellow-600 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4 text-slate-300 mt-11">Our Community Impact</h2>
            <p className="text-xl text-slate-300/80">Trusted by hospitals, loved by donors, saving lives together.</p>
          </div>

          <div className="bgrelative w-full h-96 flex items-center justify-center mb-20">
            <div className="flipster-carousel relative w-full max-w-5xl h-full flex items-center justify-center perspective-1200 mx-auto" style={{ width: '70%' }}>
              {[
                {
                  title: "City General Hospital",
                  image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop",
                  type: "hospital"
                },
                {
                  title: "Our Dedicated Donors",
                  image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
                  type: "donors"
                },
                {
                  title: "St. Mary's Medical Center",
                  image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop",
                  type: "hospital"
                },
                {
                  title: "Blood Drive Events",
                  image: "https://tmckolkata.com/in/wp-content/uploads/2021/06/blood_donation1.jpg",
                  type: "event"
                },
                {
                  title: "Regional Medical Hub",
                  image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop",
                  type: "hospital"
                },
                {
                  title: "Community Heroes",
                  image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
                  type: "donors"
                },
                {
                  title: "Emergency Response Team",
                  image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=300&fit=crop",
                  type: "team"
                }
              ].map((item, index) => {
                const totalCards = 7;
                const centerIndex = Math.floor(totalCards / 2);
                const offset = index - centerIndex;
                const isCenter = index === centerIndex;
                
                return (
                  <div
                    key={index}
                    className="flipster-item absolute w-64 h-72 transition-all duration-1000 ease-in-out"
                    style={{
                      transform: `translateX(${offset * 300}px) rotateY(${offset * 35}deg) translateZ(${isCenter ? '80px' : Math.abs(offset) * -60 + 'px'})`,
                      zIndex: isCenter ? 10 : 10 - Math.abs(offset),
                      opacity: Math.abs(offset) > 2 ? 0 : 1,
                      animation: `flipster-flow 28s linear infinite`,
                      animationDelay: `${index * -4}s`
                    }}
                  >
                    <div className={`w-full h-full border-2 border-gray-200 rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden group bg-transparent ${
                      isCenter ? 'shadow-red-600/60 border-red-300 scale-110' : 'hover:shadow-red-400/40 hover:border-red-200'
                    }`}>
                      <div className="relative h-44 overflow-hidden rounded-t-2xl">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      </div>
                      <div className="p-4 text-center bg-slate-300">
                        <h3 className={`text-base font-semibold mb-2 transition-colors duration-300 ${
                          isCenter ? 'text-red-700' : 'text-gray-800 group-hover:text-red-600'
                        }`}>
                          {item.title}
                        </h3>
                        <div className="flex justify-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.type === 'hospital' ? 'bg-blue-100 text-blue-700' :
                            item.type === 'donors' ? 'bg-green-100 text-green-700' :
                            item.type === 'event' ? 'bg-purple-100 text-purple-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats overlay */}
          
        </div>

        <style jsx>{`
          .perspective-1200 {
            perspective: 1200px;
          }
          
          @keyframes flipster-flow {
            0% {
              transform: translateX(-900px) rotateY(-105deg) translateZ(-240px);
              opacity: 0;
            }
            10% {
              transform: translateX(-600px) rotateY(-70deg) translateZ(-180px);
              opacity: 0.7;
            }
            20% {
              transform: translateX(-300px) rotateY(-35deg) translateZ(-60px);
              opacity: 1;
            }
            30% {
              transform: translateX(0px) rotateY(0deg) translateZ(80px);
              opacity: 1;
            }
            45% {
              transform: translateX(0px) rotateY(0deg) translateZ(80px);
              opacity: 1;
            }
            55% {
              transform: translateX(300px) rotateY(35deg) translateZ(-60px);
              opacity: 1;
            }
            70% {
              transform: translateX(600px) rotateY(70deg) translateZ(-180px);
              opacity: 0.7;
            }
            85% {
              transform: translateX(900px) rotateY(105deg) translateZ(-240px);
              opacity: 0;
            }
            100% {
              transform: translateX(1200px) rotateY(140deg) translateZ(-300px);
              opacity: 0;
            }
          }
          
          .flipster-item:nth-child(1) { animation-delay: 0s; }
          .flipster-item:nth-child(2) { animation-delay: -4s; }
          .flipster-item:nth-child(3) { animation-delay: -8s; }
          .flipster-item:nth-child(4) { animation-delay: -12s; }
          .flipster-item:nth-child(5) { animation-delay: -16s; }
          .flipster-item:nth-child(6) { animation-delay: -20s; }
          .flipster-item:nth-child(7) { animation-delay: -24s; }
        `}</style>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-red-900 via-red-900 to-yellow-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-yellow-600">Ready to Save Lives?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-[rgba(190,187,183,1)]">
            Join thousands of donors and healthcare providers making a difference every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register?role=donor">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3 bg-slate-300 text-[rgba(199,134,5,1)]">
                Register as Donor
              </Button>
            </Link>
            <Link href="/auth/register?role=hospital">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 hover:bg-yellow-600 hover:text-slate-300 bg-transparent border-[rgba(191,122,8,1)] text-slate-300"
              >
                Register Hospital
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
<footer
  className="text-gray-800 py-12 my-0 px-4 mx-0"
  style={{
    background: `
      radial-gradient(at 21.2931% 21.9583%, #7f1d1d 0px, transparent 50%),
      radial-gradient(at 83.1465% 79.4583%, #7f1d1d 0px, transparent 50%),
      radial-gradient(at 28.944% 73.2083%, #c78605 0px, transparent 50%),
      radial-gradient(at 71.1853% 22.375%, #c78605 0px, transparent 50%),
      #1a2849
    `,
  }}
>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-slate-300" />
                <span className="text-xl font-bold text-slate-300">BloodConnect</span>
              </div>
              <p className="text-gray-400">Connecting lives through technology and compassion.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-300">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/donor" className="hover:text-white">
                    Donor Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/hospital" className="hover:text-white">
                    Hospital Portal
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-white">
                    Admin Panel
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-300">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Emergency
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-300">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    HIPAA Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-300 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BloodConnect. All rights reserved. Built for saving lives.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
