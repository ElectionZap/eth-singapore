import * as React from "react";
import axios from 'axios';

const initialWeights = [
    { option0_weights: [0, 2, 0, 1, 0], option1_weights: [0, 0, 2, 0, 0] },
    { option0_weights: [2, 0, 1, 1, 0], option1_weights: [0, 2, 1, 0, 0] },
    { option0_weights: [0, 2, 0, 1, 0], option1_weights: [2, 0, 0, 1, 0] },
    { option0_weights: [0, 2, 0, 1, 0], option1_weights: [2, 0, 0, 1, 0] },
    { option0_weights: [0, 2, 0, 1, 0], option1_weights: [2, 0, 0, 1, 0] },
    { option0_weights: [0, 2, 0, 1, 0], option1_weights: [2, 0, 0, 1, 0] }
];

export default function TestNillionPage() {

    const [storeId, setStoreId] = React.useState<string | null>(null);
    const [weights, setWeights] = React.useState(initialWeights);

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
    
    const storeValues = async () => {
        try {
          const transformedWeights: Record<string, number> = {};
    
          // Dynamically generate keys and values for each question and its options
          weights.forEach((weight, qIndex) => {
            weight.option0_weights.forEach((val, wIndex) => {
              transformedWeights[`q${qIndex + 1}_option0_weight_${wIndex + 1}`] = val;
            });
            weight.option1_weights.forEach((val, wIndex) => {
              transformedWeights[`q${qIndex + 1}_option1_weight_${wIndex + 1}`] = val;
            });
          });
    
          // Send the transformed weights to the backend
          const response = await axios.post('/api/store_values', transformedWeights, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
    
          setStoreId(response.data.store_id);
          console.log('Stored values response:', response.data);
        } catch (error) {
          console.error('Error storing values:', error);
        }
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
