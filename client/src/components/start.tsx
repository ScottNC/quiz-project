import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";

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
  const [questions, setQuestions] = useState<Question>();
  const effectCalled = useRef<boolean>(false);

  const quiz_id = 77; // hardcoded should be passed from quiz type page
  const question_no = 1; // set to first question

  useEffect(() => {
    if (effectCalled.current) return;
    fetchQuestions();
    effectCalled.current = true;
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(BASE_URL + "/question", {
        params: { quizId: quiz_id, questionNumber: question_no },
      });
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

export default Start;
