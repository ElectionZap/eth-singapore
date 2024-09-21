import * as React from "react";
import axios from 'axios';
import { getQuizFromPoll, addNillionIdToPoll } from "@/database/dbApi";
import { add } from "date-fns";

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

export default function TestNillionPage() {
    const [quiz, setQuiz] = React.useState<Quiz | null>(null);
    const [storeId, setStoreId] = React.useState<string | null>(null);
    const [weights, setWeights] = React.useState<any[]>([]);

    // Fetch the quiz when the component mounts
    React.useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const quiz = await getQuizFromPoll(1); // Fetch the quiz
                console.log('Quiz:', quiz);
                setQuiz(quiz);

                // Set initial weights based on the fetched quiz data
                const initialWeights = quiz.support_questions.map((question) => ({
                    option0_weights: question.weights.option_0_weights,
                    option1_weights: question.weights.option_1_weights,
                }));
                setWeights(initialWeights);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };
        fetchQuiz();
    }, []); // Empty dependency array means this runs once when the component mounts

    // Watch for weight changes and trigger storeValues when weights are updated
    React.useEffect(() => {
        if (weights.length > 0) {
            storeValues();
        }
    }, [weights]); // Run storeValues only when weights change

    // Function to store the quiz weights
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

            // Update store ID
            await addNillionIdToPoll(1, response.data.store_id); // This should be the Nillion ID update
            setStoreId(response.data.store_id); // Store the ID
            console.log('Stored values response:', response.data);
        } catch (error) {
            console.error('Error storing values:', error);
        }
    };


    const [answers, setAnswers] = React.useState({
        q1_answer: 1,
        q2_answer: 2,
        q3_answer: 3,
        q4_answer: 4,
        q5_answer: 2,
        q6_answer: 1
    });

    const handleWeightChange = (qIndex: number, option: 'option0' | 'option1', wIndex: number, value: number) => {
        const updatedWeights = [...weights];
        updatedWeights[qIndex][`${option}_weights`][wIndex] = value;
        setWeights(updatedWeights);
    };
    
    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswers({
          ...answers,
          [e.target.name]: Number(e.target.value)
        });
    };
    
    const computeValues = async () => {
        try {
          if (!storeId) {
            alert("Please store values first!");
            return;
          }
    
          const response = await axios.post('/api/compute', {
            store_id: storeId,
            ...answers
          }, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
    
          console.log('Computation result:', response.data.result);
          alert(`Computation Result: ${response.data.result}`);
        } catch (error) {
          console.error('Error computing values:', error);
        }
    };

    return (
        <div className="items-center justify-items-center min-h-screen px-48 font-[family-name:var(--font-geist-sans)]">
            <p>TEST</p>
            <div style={{ padding: '20px' }}>
                <h1>Next.js Quiz App</h1>

                <h2>Store Weights</h2>
                {weights.map((weight, qIndex) => (
                    <div key={qIndex}>
                    <h3>Question {qIndex + 1}</h3>
                    {weight.option0_weights.map((val, wIndex) => (
                        <div key={wIndex}>
                        <label>Option 0 Weight {wIndex + 1}: </label>
                        <input
                            type="number"
                            value={val}
                            onChange={(e) => handleWeightChange(qIndex, 'option0', wIndex, Number(e.target.value))}
                        />
                        </div>
                    ))}
                    {weight.option1_weights.map((val, wIndex) => (
                        <div key={wIndex}>
                        <label>Option 1 Weight {wIndex + 1}: </label>
                        <input
                            type="number"
                            value={val}
                            onChange={(e) => handleWeightChange(qIndex, 'option1', wIndex, Number(e.target.value))}
                        />
                        </div>
                    ))}
                    </div>
                ))}
                <button onClick={storeValues}>Store Weights</button>

                <h2>Compute with Answers</h2>
                {Object.keys(answers).map((key) => (
                    <div key={key}>
                    <label>{key.replace('_', ' ').toUpperCase()}:</label>
                    <input
                        type="number"
                        name={key}
                        value={answers[key as keyof typeof answers]}
                        onChange={handleAnswerChange}
                    />
                    </div>
                ))}
                <button onClick={computeValues}>Compute Result</button>
            </div>
        </div>
    );
}
