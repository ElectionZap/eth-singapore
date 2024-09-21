"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/router"

interface Vote {
  id: number
  electionName: string
  votedOption: string
  currentPercentage: number
  currentPosition: number
  totalOptions: number
}

const mockUserData = {
  votes: [
    { id: 1, electionName: "Presidential Election 2024", votedOption: "Candidate A", currentPercentage: 45, currentPosition: 1, totalOptions: 5 },
    { id: 2, electionName: "Local Mayor Race", votedOption: "Candidate X", currentPercentage: 30, currentPosition: 2, totalOptions: 4 },
    { id: 3, electionName: "State Governor Election", votedOption: "Candidate M", currentPercentage: 22, currentPosition: 3, totalOptions: 6 },
  ]
}

const PositionBadge = ({ position, total }: { position: number; total: number }) => {
  let color = "bg-gray-500"
  if (position === 1) color = "bg-yellow-500"
  else if (position === 2) color = "bg-gray-400"
  else if (position === 3) color = "bg-orange-500"

  return (
    <Badge className={`${color} text-white`}>
      {position}/{total}
    </Badge>
  )
}

export default function UserProfile() {
    const router = useRouter() 
    const { account } = router.query

    return (
        <div className="container mx-auto px-4 pt-8 pb-20">
        <Card className="max-w-4xl mx-auto py-12">
            <CardHeader className="flex flex-col items-center space-y-4">
            <Image
                src="/placeholder.jpg"
                alt="User profile picture"
                width={128}
                height={128}
                className="h-24 w-24 rounded-full"
            />
            <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
            <p className="text-sm text-gray-500">{account}</p>
            </CardHeader>
            <CardContent className="px-24">
            <h2 className="text-xl font-semibold mb-4">Your Votes</h2>
            <div className="space-y-6">
                {mockUserData.votes.map((vote) => (
                <motion.div
                    key={vote.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card>
                    <CardContent className="pt-6">
                        <h3 className="text-lg font-medium mb-2">{vote.electionName}</h3>
                        <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Voted for: {vote.votedOption}</span>
                        <PositionBadge position={vote.currentPosition} total={vote.totalOptions} />
                        </div>
                        <div className="flex items-center space-x-2">
                        <Progress value={vote.currentPercentage} className="flex-grow" />
                        <span className="text-sm font-medium">{vote.currentPercentage}%</span>
                        </div>
                    </CardContent>
                    </Card>
                </motion.div>
                ))}
            </div>
            </CardContent>
        </Card>
        </div>
    )
}