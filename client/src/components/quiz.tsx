import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { useParams, Link } from "react-router-dom";
import { Name } from "./types/quiz_types";

const QuizStart: React.FC = () => {
  const [roundId, setRoundId] = useState<number | null>(null);
  const effectCalled = useRef<boolean>(false);

  const [name, setName] = useState<Name[]>([])

  const { quizId } = useParams();

  useEffect(() => {
    const fetchQuizInfo = async () => {
      const nameResponse = await axios.get(BASE_URL + '/name', {params: {quizId}});

      setName(nameResponse.data);

      axios
        .post(BASE_URL + `/start?quizId=${quizId}`)
        .then((response) => response.data)
        .then((data) => {
          if (data.length && data[0].message === "success")
            setRoundId(data[0].id);
          else setRoundId(null);
        });
    }
      try {
        if (effectCalled.current) return;

        effectCalled.current = true;

        if (quizId === undefined) return;

        fetchQuizInfo();
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }, [quizId]);

  if (!roundId)
    return (
      <div className="bg-light w-full flex flex-col gap-y-12;">
      </div>
    );

  return (
    <section className="w-full bg-light justify-center">
      <div className="pt-6 text-2xl text-dark font-bold text-center">
        <div>
          {name.map((nameInfo: Name) => <h1>{nameInfo.name}</h1>)}
        </div>
        <h2>Are you ready to begin?</h2>
        <Link to={`/question/${quizId}/${roundId}`}>
          <div className="bg-light w-full p-8 flex justify-center font-sans">
            <button
              className="w-40 h-16 bg-dark text-lightest font-bold rounded-lg cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#40798C,0_0px_0_0_#1b70f841]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#40798C,0_15px_0_0_#1b70f841]
    border-b-[1px] border-blue-400"
            >
              Start
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default QuizStart;
