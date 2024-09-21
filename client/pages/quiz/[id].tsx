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
import { getQuizFromPoll, addNillionIdToPoll } from "@/database/dbApi";

interface SelectedAnswers {
  [key: string]: number; 
}

interface Question {
  id: number
  text: string
  options: string[]
}

interface Quiz {
  main_question: string;
  main_options: string[];
  support_questions: {
      question: string;
      options: string[];
      weights: {
          option_0_weights: number[];
          option_1_weights: number[];
      };
  }[];
}

export default function QuizPage() {
  const [loading, setLoading] = React.useState(false)
  const router = useRouter() 
  const { id } = router.query
  const { account } = useWallet()
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
  const [selectedAnswers, setSelectedAnswers] = React.useState<SelectedAnswers>({
    q1_answer: -1,
    q2_answer: -1,
    q3_answer: -1,
    q4_answer: -1,
    q5_answer: -1,
    q6_answer: -1
  })

  const [quiz, setQuiz] = React.useState<Quiz | null>(null);
  const [storeId, setStoreId] = React.useState<string | null>(null);
  const [weights, setWeights] = React.useState<any[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const transformQuizToQuestions = (quiz: Quiz): Question[] => {
    return quiz.support_questions.map((supportQuestion, index) => ({
      id: index + 1,
      text: supportQuestion.question,
      options: supportQuestion.options
    }));
  };

  React.useEffect(() => {
      if (quiz === null) {
          const fetchQuiz = async () => {
              try {
                  if (typeof id === 'string') {
                      const quiz = await getQuizFromPoll(id); // Fetch the quiz
                      console.log('Quiz:', quiz);
                      setQuiz(quiz);

                      // Transform the quiz data to questions
                      const transformedQuestions = transformQuizToQuestions(quiz);
                      setQuestions(transformedQuestions);

                      // Set initial weights based on the fetched quiz data
                      const initialWeights = quiz.support_questions.map((question: { question: string; options: string[]; weights: { option_0_weights: number[]; option_1_weights: number[]; }; }) => ({
                          option0_weights: question.weights.option_0_weights,
                          option1_weights: question.weights.option_1_weights,
                      }));
                      setWeights(initialWeights);
                  } else {
                      console.error('Invalid quiz ID');
                  }
              } catch (error) {
                  console.error('Error fetching quiz:', error);
              }
          };

          fetchQuiz();
      }
  }, [quiz, id]); // Runs only if `quiz` is null and `id` changes


  React.useEffect(() => {
      if (weights.length > 0) {
          storeValues();
      }
  }, [weights]);

  const storeValues = async () => {
      try {
          const transformedWeights: Record<string, number> = {};

          console.log('weights:', weights);

          // Dynamically generate keys and values for each question and its options
          weights.forEach((weight, qIndex) => {
              weight.option0_weights.forEach((val: number, wIndex: number) => {
                  transformedWeights[`q${qIndex + 1}_option0_weight_${wIndex + 1}`] = val;
              });
              weight.option1_weights.forEach((val: number, wIndex: number) => {
                  transformedWeights[`q${qIndex + 1}_option1_weight_${wIndex + 1}`] = val;
              });
          });

          // Send the transformed weights to the backend
          const response = await axios.post('/api/store_values', transformedWeights, {
              headers: {
                  'Content-Type': 'application/json',
              }
          });

          // Update Nillion store ID
          if (typeof id === 'string') {
            await addNillionIdToPoll(id, response.data.store_id);
            setStoreId(response.data.store_id);
          } else {
            console.error('Invalid quiz ID');
          }
          console.log('Stored values response:', response.data);
      } catch (error) {
          console.error('Error storing values:', error);
      }
  };

  // Question and answer state and handlers
  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [`q${currentQuestion.id}_answer`]: Number(answer) }))
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handleSubmit = async () => {
    console.log("Submitted answers: ", selectedAnswers)

    setLoading(true)

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
      if (quiz) {
        router.push(`/result/${id}/${quiz.main_options[response.data.result.final_choice]}/${account}`)
      } else {
        console.error('Quiz is null');
      }
      setLoading(false)
    } catch (error) {
      console.error('Error computing values:', error);
      setLoading(false)
    }
  }

  if (currentQuestion) {
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
            {currentQuestionIndex === questions.length - 1 ? (
              
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
}
