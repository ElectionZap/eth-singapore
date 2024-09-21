"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from 'next/router'
import { useWallet } from "@/contexts/Wallet"

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
  }
]

export default function QuizPage() {
  const router = useRouter() 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({})
  const { id } = router.query
  const { account } = useWallet()

  const currentQuestion = mockQuestions[currentQuestionIndex]

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }))
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

  const handleSubmit = () => {
    console.log("Submitted answers: ", selectedAnswers)

    // Push to the result route with dynamic parameters
    router.push(`/result/${id}/${account}`)
  }

  const isAnswerSelected = !!selectedAnswers[currentQuestion.id] // Check if the user selected an answer for the current question

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
                      selectedAnswers[currentQuestion.id] === option
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                    onClick={() => handleAnswerSelect(option)}
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
            <Button onClick={handleSubmit} disabled={!isAnswerSelected}>
              Submit
            </Button>
          ) : (
            <Button onClick={goToNextQuestion} disabled={!isAnswerSelected}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
