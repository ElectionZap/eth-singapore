"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white -mt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-950 py-48">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Election<span className="text-blue-300 text-6xl">.xyz</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-200">Your election recommendation</p>
          <Link href="/polls">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-100">
              See Polls
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Aspects Section */}
      <section className="py-24 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-24"
          >
            <div className="text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-800 to-blue-950 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h2 className="text-xl font-semibold max-w-[200px]">Find your vote recommendation</h2>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-800 to-blue-950 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h2 className="text-xl font-semibold max-w-[200px]">Vote and compare results</h2>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}