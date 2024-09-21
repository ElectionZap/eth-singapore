"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import confetti from 'canvas-confetti'
import Link from "next/link"
import { useRouter } from "next/router"

// Mock API calls
const fetchResult = () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Candidate A")
    }, 3000) // 3 seconds delay
  })
}

const submitVote = () => {
  return new Promise<{ option: string; percentage: number; rank: number }>((resolve) => {
    setTimeout(() => {
      resolve({ option: "Option 2", percentage: 32, rank: 2 })
    }, 2000) // 2 seconds delay
  })
}

const ProgressBar = ({ percentage }: { percentage: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
    <motion.div 
      className="bg-primary h-2.5 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${percentage}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
  </div>
)

const RankDisplay = ({ rank }: { rank: number }) => {
  const rankSuffix = rank === 1 ? "st" : rank === 2 ? "nd" : rank === 3 ? "rd" : "th"
  return (
    <motion.div
      className="inline-block bg-primary text-primary-foreground rounded-full px-4 py-2 text-lg font-bold"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {rank}<sup>{rankSuffix}</sup>
    </motion.div>
  )
}

export default function ResultPage() {
    const router = useRouter() 
    const { account } = router.query
    const [isLoading, setIsLoading] = useState(true)
    const [result, setResult] = useState<string | null>(null)
    const [isVoting, setIsVoting] = useState(false)
    const [voteResult, setVoteResult] = useState<{ option: string; percentage: number; rank: number } | null>(null)

    useEffect(() => {
        fetchResult().then((data) => {
        setResult(data)
        setIsLoading(false)
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        })
        })
    }, [])

    const handleVote = () => {
        setIsVoting(true)
        submitVote().then((data) => {
        setVoteResult(data)
        setIsVoting(false)
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        })
        })
    }

    return (
        <div className="flex items-center justify-center p-4 mt-8">
        <Card className="w-full max-w-2xl bg-black/30 backdrop-blur-md p-16">
                {voteResult ? (
                    <></>
                ) : (
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-center">Your Result</CardTitle>
                    </CardHeader> 
                )}
            <CardContent>
            <AnimatePresence mode="wait">
                {isLoading ? (
                <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-40"
                >
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p className="mt-4 text-xl">Analyzing your answers...</p>
                </motion.div>
                ) : isVoting ? (
                <motion.div
                    key="voting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-40"
                >
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p className="mt-4 text-xl">Submitting your vote...</p>
                </motion.div>
                ) : voteResult ? (
                <motion.div
                    key="voteResult"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <motion.h2
                    className="text-xl text-gray-400 font-bold mb-4"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 10 }}
                    >
                    Congratulations!
                    </motion.h2>
                    <p className="text-md text-gray-400 mb-6">
                    Your vote counts for:
                    </p>
                    <div className="text-2xl font-semibold text-primary mb-4">
                    {voteResult.option}
                    </div>
                    <div className="mb-4">
                    <p className="text-md text-gray-400 mb-2">Current percentage:</p>
                    <ProgressBar percentage={voteResult.percentage} />
                    <p className="text-lg font-semibold">{voteResult.percentage}%</p>
                    </div>
                    <div>
                    <p className="text-md text-gray-400 mb-2">Current rank:</p>
                    <RankDisplay rank={voteResult.rank} />
                    </div>
                </motion.div>
                ) : (
                <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <motion.h2
                    className="text-xl text-gray-400 font-bold mb-4"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 10 }}
                    >
                    Congratulations!
                    </motion.h2>
                    <p className="text-md text-gray-400 mb-6">
                    Based on your answers, <br></br> we recommend:
                    </p>
                    <div className="text-2xl font-semibold text-primary">
                    {result}
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
            </CardContent>
            <CardFooter className="flex justify-center space-x-4 mt-6">
            {!voteResult && (
                <Button onClick={handleVote} disabled={isVoting || isLoading}>
                {isVoting ? "Voting..." : "Now vote"}
                </Button>
            )}
            <Link href="/polls">
                <Button variant="outline">
                See other polls
                </Button>
            </Link>
            {voteResult && (
                <Link href={`/profile/${account}`}>
                    <Button>
                        Check my profile
                    </Button>
                </Link>
            )}
            </CardFooter>
        </Card>
        </div>
    )
}