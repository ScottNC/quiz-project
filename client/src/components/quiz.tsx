import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { useParams, Link } from "react-router-dom";

interface Round {
  id: number;
  quiz_id: number;
  answered: number;
  correct: number;
  status: string;
}

const Quiz: React.FC = () => {
  const [rounds, setRounds] = useState<Round[]>([]);
  const effectCalled = useRef<boolean>(false);

  const { quizId } = useParams();

  useEffect(() => {
    if (effectCalled.current) return;
    postRounds();
    effectCalled.current = true;
  }, []);

  const postRounds = async () => {
    try {
      const response = await axios.post(BASE_URL + "/start", {
        params: { quizId: quizId },
      });
      setRounds(response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="flex flex-col gap-y-12;">
      <h1> Are you ready to start </h1>
      {rounds.map((round) => (
        <Link to={`/question/${quizId}/${round.id}`}>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l;">
            Start
          </button>
        </Link>
      ))}
    </div>
  );
};

export default Quiz;
