
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";

interface Answer {
  id: number;
  answerId: number;
  answer: string;
  correct: boolean;
}

interface Question {
  id: number;
  questionText: string;
  multipleChoice: boolean;
  answers: Array<Answer>;
}

const Question: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/question`);
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAnswer = async (roundId: number, questionNumber: number, answerId: number, correct: boolean) => {
    try {
      setSelectedAnswer(answerId);
      setCorrect(correct);

      const response = await axios.put(`${BASE_URL}/put-answer`, {
        roundId,
        questionNumber,
        correct,
      });
      console.log("Answer sent to server:", response.data);
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
                <div
                  className={selectedAnswer === answer.answerId ? "selected-answer" : ""}
                  style={{ backgroundColor: selectedAnswer === answer.answerId ? "lightblue" : "transparent" }}
                >
                  {answer.answer}
                </div>
                <button onClick={() => handleAnswer(1, question.id, answer.answerId, answer.correct)}>
                  Select
                </button>
              </li>
            ))}
          </ul>
          {selectedAnswer !== null && correct !== null && (
            <div>
              <p>Selected Answer ID: {selectedAnswer}</p>
              <p>Correctness: {correct ? "Correct" : "Incorrect"}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Question;
