import React, { useState, useEffect, useRef } from "react";
import { storeAnswer } from "./answer";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { useParams } from "react-router-dom";

interface Answer {
  id: number;
  answerId: number;
  answer: string;
  correct: boolean;
}

interface QuestionProp {
  id: number;
  questionText: string;
  multipleChoice: boolean;
  answers: Array<Answer>;
}

const Question: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionProp[]>([]);
  const effectCalled = useRef<boolean>(false);

  const { quizId, roundId } = useParams();

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

  const handleAnswer = async (correct: boolean) => {
    try {
      console.log(correct);
      // Make a PUT request to save the answer to the server
      const response = await storeAnswer(roundId, questionNumber, correct);
      console.log("Answer sent to server:", response);

      // Move to the next question after answering
      setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    } catch (error) {
      console.error("Error sending answer to server:", error);
    }
  };

  return (
    <div className="flex flex-col gap-y-12;">
      {questions.map((question) => (
        <div key={question.id}>
          <h1>{question.questionText}</h1>
          {question.answers.map((answer) => (
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l;"
              key={answer.id}
              onClick={() => handleAnswer(answer.correct)}
            >
              {answer.answer}
            </button>
          ))}
        </div>

        //   <ul>
        //     {question.answers.map((answer) => (
        //       <li key={answer.answerId}>
        //         <button onClick={() => handleAnswer(answer.correct)}>
        //           {answer.answer}
        //         </button>
        //       </li>
        //     ))}
        //   </ul>
        // </div>
      ))}
    </div>
  );
};

export default Question;
