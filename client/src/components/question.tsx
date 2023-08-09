import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { Link, useParams } from "react-router-dom";
import { Answer, CurrentQuestion, Question } from "./types/quiz_types";


const Questions: React.FC = () => {
  const { quizId, roundId } = useParams<{
    quizId: string;
    roundId: string;
  }>();

  const [questions, setQuestions] = useState<Question[]>([]);
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
        const currentQuestionResponse = await axios.get(
          `${BASE_URL}/currentquestion?roundId=${roundId}`
        );
        const currentQuestion: CurrentQuestion[] = currentQuestionResponse.data;
        setQuestionNumber(currentQuestion[0].answered + 1);

        const questionResponse = await axios.get(
          `${BASE_URL}/question?quizId=${quizId}&questionNumber=${
            currentQuestion[0].answered + 1
          }`
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
          <section className="w-full bg-light">
            <Link to={`/seeresult/${roundId}`}>
              <div className="w-full p-8 flex justify-center font-sans">
                <button
                  className="bg-darkest hover:bg-gray-400 text-lightest font-bold py-2 px-4 rounded-l;"
                  onClick={nextQuestion}
                >
                  Finish Quiz
                </button>
              </div>
            </Link>
          </section>
        );
      else
        return (
          <section className="w-full bg-light p-8 flex justify-center font-sans">
            <button
              className="w-40 h-16 bg-dark text-lightest font-bold rounded-lg cursor-pointer select-none
              active:translate-y-2  active:[box-shadow:0_0px_0_0_#40798C,0_0px_0_0_#1b70f841]
              active:border-b-[0px]
              transition-all duration-150 [box-shadow:0_10px_0_0_#40798C,0_15px_0_0_#1b70f841]
              border-b-[1px] border-blue-400"
              onClick={nextQuestion}
            >
              Next Question
            </button>
          </section>
        );
    } else return null;
  };

  const getBackground = (idx: number | null) => {
    let backgroundColour = "bg-dark";

    if (idx === right) backgroundColour = "bg-correct";
    if (idx === wrong) backgroundColour = "bg-wrong";

    return (
      backgroundColour +
      "p-3 w-40 h-16 text-dark font-bold rounded-lg cursor-pointer select-none active:translate-y-2 active:[box-shadow:0_0px_0_0_#40798C,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#40798C,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400"
    );
  };

  const nextQuestion = async () => {
    try {
      if (roundId === undefined || questionNumber == undefined) return;

      await axios({
        method: "put",
        url: `${BASE_URL}/answer`,
        params: {
          roundId,
          questionNumber,
          correct,
        },
      });

      if (!questions[0].finalQuestion) {
        const response = await axios.get(
          `${BASE_URL}/question?quizId=${quizId}&questionNumber=${
            questionNumber + 1
          }`
        );
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
      <div className="bg-light w-full h-screen p-4 flex justify-center font-sans">
        {questions.map((question) => (
          <div key={question.id}>
            <h1 className="text-2xl text-dark font-bold text-center">
              Question {questionNumber}
            </h1>
            <div className="pt-2 pb-6 text-dark font-bold text-center">
              {question.questionText}
            </div>
            {question.answers.map((answer, idx) => (
              <div className="w-full p-2 flex justify-center font-sans">
                <button
                  className={getBackground(idx)}
                  key={answer.answerId}
                  onClick={() => checkAnswer(answer, idx)}
                  disabled={correct !== null}
                >
                  {answer.answer}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      {nextQuestionButton()}
    </>
  );
};

export default Questions;
