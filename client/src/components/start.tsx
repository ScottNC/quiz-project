import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { useParams, Link } from "react-router-dom";
interface Answer {
  answerId: number;
  answerText: string;
  answerIsCorrect: boolean;
}
interface Question {
  id: number;
  questionText: string;
  multipleChoice: boolean;
  answers: Array<Answer>;
}
const Start: React.FC = () => {
  const [question, setQuestion] = useState<Question>();
  const effectCalled = useRef<boolean>(false);

  const { quizId } = useParams();

  const question_no = 1; // set to first question

  useEffect(() => {
    if (effectCalled.current) return;
    fetchQuestions();
    effectCalled.current = true;
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(BASE_URL + "/question", {
        params: { quizId: quizId, questionNumber: question_no },
      });
      setQuestion(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section className="bg-green-200">
      <h1 className="text-3xl text-green-800 font-bold">
        {" "}
        Are you ready for the First Question?
      </h1>

      <Link to={`/question/${quizId}`}>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l;">
          Yes
        </button>
      </Link>
    </section>
  );
};
export default Start;
