"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Lock } from "lucide-react"
import { useRouter } from "next/router"
import { useWallet } from "@/contexts/Wallet"
import Link from "next/link"

interface Option {
  id: number
  name: string
  percentage: number
}

interface ElectionData {
  id: number
  title: string
  image: string
  description: string
  options: Option[]
  deadline: string
}

const electionData: ElectionData = {
  id: 1,
  title: "2024 Presidential Election",
  image: "/placeholder.jpg",
  description: "The upcoming 2024 Presidential Election is a pivotal moment for our nation. Voters will choose the next leader of our country, who will guide us through critical domestic and international challenges. This election will shape policies on healthcare, economy, climate change, and foreign relations for years to come.",
  options: [
    { id: 1, name: "John Smith (Party A)", percentage: 35 },
    { id: 2, name: "Sarah Johnson (Party B)", percentage: 32 },
    { id: 3, name: "Michael Lee (Party C)", percentage: 18 },
    { id: 4, name: "Emily Brown (Independent)", percentage: 10 },
    { id: 5, name: "Other Candidates", percentage: 5 },
  ],
  deadline: "November 3, 2024"
}

function GhostProgressBar() {
  return (
    <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden relative animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <Lock className="w-4 h-4 text-gray-400 animate-pulse" />
      </div>
    </div>
  )
}

export default function ElectionDetails() {
  const router = useRouter();
    const { id } = router.query;

    const { signer } = useWallet();

  return (
    <div className="container mx-auto max-w-6xl px-4 pt-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={electionData.image}
          alt={electionData.title}
          width={800}
          height={300}
          className="w-full h-48 object-cover rounded-lg shadow-md mb-8"
        />
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>
                <p className="text-3xl font-bold mb-2">
                  {electionData.title}
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div>
                <p className="text-gray-600 mb-4">{electionData.description}</p>
                <p className="text-sm text-gray-500 mb-6">
                  Deadline to vote: <span className="font-semibold">{electionData.deadline}</span>
                </p>
              </div>
              {signer ? (
                <Link href={`/quiz/${id}`}>
                  <Button className="w-full mt-auto" size="lg">
                    Start Recommendation
                  </Button>
                </Link>
              ) : (
                <Button className="w-full mt-auto" size="lg" disabled>
                  Connect Wallet
                </Button>
              )}
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Current Standings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {electionData.options.map((option) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{option.name}</span>
                      <span className="text-sm font-semibold">
                        {signer ? `${option.percentage}%` : '--'}
                      </span>
                    </div>
                    {signer ? (
                      <Progress value={option.percentage} className="h-2" />
                    ) : (
                      <GhostProgressBar />
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}