
import React, { useState, useEffect, useRef } from "react";
import { putAnswer } from "./api";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";

interface Answer {
  id: number;
  answerId: number;
  answer: string;
}

interface Question {
  id: number;
  questionText: string;
  multipleChoice: boolean;
  answers: Array<Answer>;
}

const Question: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const effectCalled = useRef<boolean>(false);
  const quizId = 77; // Replace with the actual quiz ID
  const [questionNumber, setQuestionNumber] = useState(1); // Use state to keep track of the current question number

  useEffect(() => {
    if (effectCalled.current) return;
    fetchQuestions();
    effectCalled.current = true;
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/question`, {
        params: { quizId, questionNumber },
      });
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAnswer = async ( correct: boolean) => {
    try {
      // Make a PUT request to save the answer to the server
      const response = await putAnswer(quizId, questionNumber, correct);
      console.log("Answer sent to server:", response);

      // Move to the next question after answering
      setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    } catch (error) {
      console.error("Error sending answer to server:", error);
    }
  };

  return (
    <section>
      {questions.map((question) => (
        <div key={question.id}>
          <h1>{question.questionText}</h1>
          <ul>
            {question.answers.map((answer) => (
              <li key={answer.answerId}>
                {answer.answer}
                <button onClick={() => handleAnswer( true)}>Select</button>
                {/* Replace 'true' with the appropriate correct value based on user's answer */}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default Question;
