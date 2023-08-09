import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { Link, useParams } from "react-router-dom";
import { Result } from "./types/quiz_types";

const Results: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const effectCalled = useRef<boolean>(false);

  const { roundId } = useParams<{
    roundId: string;
  }>();

  useEffect(() => {
    if (effectCalled.current) return;
    effectCalled.current = true;
    const fetchRound = async () => {
      try {
        const response = await axios.get(BASE_URL + "/result", {
          params: { roundId: parseInt(roundId ?? "1") },
        });
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRound();
  }, [roundId]);

  const getComment = (correct: number, total: number) => {
    const ratio = correct/total;

    if (ratio <= 0.4)
      return 'Oh dear maybe try again 😞';
    if (ratio <= 0.7)
      return 'Not bad 🤔';
    if (ratio < 1)
      return 'Nice Work 😄'

    return 'You Aced It Try Another Quiz!!! 🤩'
  }
  
  return results.length ? (
    <section className="w-full h-screen bg-light">
      <div className="text-dark font-bold p-10 text-center">
        You scored {results[0].correct} out of {results[0].questionCount}!
        <p>{getComment(results[0].correct, results[0].questionCount)}</p>
      </div>
      <div className="bg-light w-full p-8 flex justify-center font-sans">
        <Link to={`/quiz/${results[0].quizId}`}>
          <button
            className="w-40 h-16 bg-dark text-lightest font-bold rounded-lg cursor-pointer select-none
            active:translate-y-2  active:[box-shadow:0_0px_0_0_#40798C,0_0px_0_0_#1b70f841]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_10px_0_0_#40798C,0_15px_0_0_#1b70f841]
            border-b-[1px] border-blue-400"
          >
            Replay
          </button>
        </Link>
      </div>
      <div className="bg-light w-full p-8 flex justify-center font-sans">
        <a href="/home">
          <button
            className="w-40 h-16 bg-dark text-lightest font-bold rounded-lg cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#40798C,0_0px_0_0_#1b70f841]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#40798C,0_15px_0_0_#1b70f841]
    border-b-[1px] border-blue-400"
          >
            Back Home
          </button>
        </a>
      </div>
    </section>
  ) : (
    <section className="w-full h-screen bg-light">
    </section>
  );
};

export default Results;
