"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from 'next/router'
import { useWallet } from "@/contexts/Wallet"
import { Loader2 } from "lucide-react"
import axios from 'axios';

interface SelectedAnswers {
  [key: string]: number; 
}

interface Question {
  id: number
  text: string
  options: string[]
}

const mockQuestions: Question[] = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid", "Rome"]
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn", "Mercury"]
  },
  {
    id: 3,
    text: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo", "Rembrandt"]
  },
  {
    id: 4,
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid", "Rome"]
  },
  {
    id: 5,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn", "Mercury"]
  },
  {
    id: 6,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn", "Mercury"]
  }
]

export default function QuizPage() {
  const router = useRouter() 
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
  const [selectedAnswers, setSelectedAnswers] = React.useState<SelectedAnswers>({
    q1_answer: -1,
    q2_answer: -1,
    q3_answer: -1,
    q4_answer: -1,
    q5_answer: -1,
    q6_answer: -1
  })
  const [loading, setLoading] = React.useState(false)
  const { id } = router.query
  const { account } = useWallet()

  const currentQuestion = mockQuestions[currentQuestionIndex]

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [`q${currentQuestion.id}_answer`]: Number(answer) }))
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handleSubmit = async () => {
    console.log("Submitted answers: ", selectedAnswers)

    setLoading(true)

    const storeId = "707dae54-2d6d-4a15-a9db-4448df1d32bc"; // Replace with the actual store ID
    try {
      if (!storeId) {
        alert("Please store values first!");
        return;
      }

      const response = await axios.post('/api/compute', {
        store_id: storeId,
        ...selectedAnswers
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Computation result:', response.data.result);
      router.push(`/result/${id}/${response.data.result.final_choice}/${account}`)
      setLoading(false)
    } catch (error) {
      console.error('Error computing values:', error);
      setLoading(false)
    }
  }

  const key = `q${currentQuestion.id}_answer`; // Generate the dynamic key
  const isAnswerSelected = selectedAnswers[key] > -1; // Use the dynamic key to check

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-black/30 backdrop-blur-md border-0">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center mb-12">Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>
              <div className="space-y-2">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`w-full p-4 text-left rounded-lg transition-colors ${
                      selectedAnswers[`q${currentQuestion.id}_answer`] === index
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                    onClick={() => handleAnswerSelect(index.toString())}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between mt-4">
          <Button
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          {currentQuestionIndex === mockQuestions.length - 1 ? (
            
            <Button onClick={handleSubmit} disabled={!isAnswerSelected || loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <p>Please wait</p>
                </>
              ) : <p>Submit</p>}
            </Button>
          ) : (
            <Button onClick={goToNextQuestion} disabled={!isAnswerSelected}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <p>Please wait</p>
                </>
              ) : (
                <>
                  <p>Next</p>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
