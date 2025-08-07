import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BloodConnect - Real-Time Blood Donation Platform",
  description:
    "Emergency blood shortage alert and donor mobilization system connecting hospitals with eligible donors through real-time notifications and geolocation matching.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="" lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
