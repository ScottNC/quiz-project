import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { useParams, Link } from "react-router-dom";

const Quiz: React.FC = () => {
  const [quizExists, setQuizExists] = useState<boolean>(false);
  const effectCalled = useRef<boolean>(false);

  const { quizId } = useParams();

  useEffect(() => {
    {
      try {
        if (effectCalled.current) return;

        effectCalled.current = true;

        if (quizId === undefined) return;

        axios.post(BASE_URL + `/start?quizId=${parseInt(quizId)}`)
          .then(response => response.data)
          .then(data => setQuizExists(!!data.length));
        
      } catch (error) {
        console.error("Error posting data:", error);
      }
  }}, [quizId]);

  if (!quizExists)
    return (
      <div className="flex flex-col gap-y-12;">
        <h1> Quiz missing </h1>
      </div>
    );

  return (
    <div className="flex flex-col gap-y-12;">
      <h1> Are you ready to start </h1>

      <Link to={`/question/${quizId}`}>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l;">
          Start
        </button>
      </Link>
    </div>
  );
};

export default Quiz;
