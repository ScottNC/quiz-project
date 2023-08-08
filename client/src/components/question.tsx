import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { Link, useParams } from "react-router-dom";

interface Answer {
  id: number;
  answerId: number;
  answer: string;
}

interface QuestionProp {
  id: number;
  questionText: string;
  multipleChoice: boolean;
  finalQuestion: boolean;
  answers: Array<Answer>;
}

interface CurrentQuestion {
  answered: number;
  status: string;
}

const Question: React.FC = () => {
  const { quizId, roundId } = useParams<{
    quizId: string;
    roundId: string;
  }>();

  const [questions, setQuestions] = useState<QuestionProp[]>([]);
  const effectCalled = useRef<boolean>(false);

  const [correct, setCorrect] = useState<boolean | null>(null);
  const [wrong, setWrong] = useState<number | null>(null);
  const [right, setRight] = useState<number | null>(null);

  const [questionNumber, setQuestionNumber] = useState<number>(1);

  useEffect(() => {
    if (effectCalled.current) return;
    effectCalled.current = true;

    const fetchQuestionData = async () => {
      try {

        const currentQuestionResponse = await axios.get(`${BASE_URL}/currentquestion?roundId=${roundId}`);
        const currentQuestion : CurrentQuestion[] = currentQuestionResponse.data;
        setQuestionNumber(currentQuestion[0].answered + 1)

        const questionResponse = await axios.get(
          `${BASE_URL}/question?quizId=${quizId}&questionNumber=${currentQuestion[0].answered + 1}`
        );
        setQuestions(questionResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuestionData();
  }, [questionNumber, quizId, roundId]);

  const checkAnswer = async (answer: Answer, index: number) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/correctanswer?questionId=${questions[0]?.id}`
      );
      const data = response.data[0];
      const { correctAnswerId } = data;

      if (correctAnswerId === answer.answerId) {
        setCorrect(true);
        setRight(index);
      } else {
        setCorrect(false);
        setWrong(index);
      }
    } catch (error) {
      console.error("Error receiving answer data:", error);
    }
  };

  const nextQuestionButton = () => {
  
    if (right !== null || wrong !== null) {
      if (questions[0].finalQuestion)
        return (
          <Link to={`/result/${roundId}`}>
            <button
              className="bg-orange-300 hover:bg-orange-400 text-gray-800 font-bold py-2 px-4 rounded-l"
              onClick={nextQuestion}
            >
              Finish Quiz
            </button>
          </Link>
        );
      else
        return (
            <button
              className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-l"
              onClick={nextQuestion}
            >
              Next Question
            </button>
        );
    } else return null;
  };
  

  const getBackground = (idx: number | null) => {
    let backgroundColour = "bg-gray-300";

    if (idx === right) backgroundColour = "bg-green-300";
    if (idx === wrong) backgroundColour = "bg-red-300";

    return backgroundColour + " hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l";
  };

  const nextQuestion = async () => {
    try {
      if (roundId === undefined || questionNumber == undefined) return;
  
      await axios({
        method: 'put',
        url: `${BASE_URL}/answer`,
        params: {
          roundId,
          questionNumber,
          correct,
        }
      });
  
      if (!questions[0].finalQuestion) {
        const response = await axios.get(`${BASE_URL}/question?quizId=${quizId}&questionNumber=${questionNumber + 1}`);
        setQuestions(response.data);
        setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
        setRight(null);
        setWrong(null);
        setCorrect(null);
      }
  
    } catch (error) {
      console.error("Error sending answer to server:", error);
    }
  };
  
  

  return (
    <>
      <div className="flex flex-col gap-y-12">
        {questions.map((question) => (
          <div key={question.id}>
            <h1>{question.questionText}</h1>
            {question.answers.map((answer, idx) => (
              <button
                className={getBackground(idx)}
                key={answer.id}
                onClick={() => checkAnswer(answer, idx)}
                disabled={correct !== null}
              >
                {answer.answer}
              </button>
            ))}
          </div>
        ))}
      </div>
      {nextQuestionButton()}
    </>
  );
};

export default Question;
