"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Lock } from "lucide-react"
import { useRouter } from "next/router"
import { useWallet } from "@/contexts/Wallet"
import Link from "next/link"
import { fetchPollByID } from "@/database/dbApi"

// Interface for dynamic poll data
interface Option {
  id: number
  option: string
}

interface PollData {
  poll_id: number
  title: string
  description: string
  image: string
  voting_options: Option[]
  end_date: string
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
  const router = useRouter()
  const { id } = router.query // Dynamic poll ID from URL
  const { signer } = useWallet()
  
  // State for poll data
  const [pollData, setPollData] = useState<PollData | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch poll data on component mount when ID is available
  useEffect(() => {
    if (id) {
      const loadPollData = async () => {
        setLoading(true)
        try {
          const data = await fetchPollByID(id as string)

          // Parse the voting_options field since it is returned as a string
          const parsedVotingOptions = JSON.parse(data.voting_options)

          // Set the poll data, including the parsed voting options
          setPollData({
            ...data,
            voting_options: parsedVotingOptions
          })
        } catch (error) {
          console.error("Error fetching poll data:", error)
        } finally {
          setLoading(false)
        }
      }
      loadPollData()
    }
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!pollData) {
    return <div>No poll data found</div>
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 pt-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Poll Image */}
        <Image
          src={pollData.image || "/placeholder.jpg"} 
          alt={pollData.title}
          width={800}
          height={300}
          priority
          className="w-full h-48 object-cover rounded-lg shadow-md mb-8"
        />
        <div className="grid md:grid-cols-2 gap-8">
          {/* Poll Details */}
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>
                <p className="text-3xl font-bold mb-2">{pollData.title}</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div>
                <p className="text-gray-600 mb-4">{pollData.description}</p>
                <p className="text-sm text-gray-500 mb-6">
                  Deadline to vote:{" "}
                  <span className="font-semibold">
                    {new Date(pollData.end_date).toLocaleDateString()}
                  </span>
                </p>
              </div>
              {signer ? (
                <Link href={`/quiz/${id}`}>
                    <Button
                    className="w-full mt-auto transition-transform transform hover:scale-105 hover:bg-gray-300"
                    size="lg"
                    >
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

          {/* Poll Voting Options */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Current Standings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pollData.voting_options.map((option) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{option.option}</span>
                      <span className="text-sm font-semibold">
                        {signer ? "--%" : "--"}
                      </span>
                    </div>
                    {signer ? (
                      <Progress value={0} className="h-2" /> // Replace `0` with actual percentage when available
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
