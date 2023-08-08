import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { useParams, Link } from "react-router-dom";

const Quiz: React.FC = () => {
  const [roundId, setRoundId] = useState<number | null>(null);
  const effectCalled = useRef<boolean>(false);

  const { quizId } = useParams();

  useEffect(() => {
    {
      try {
        if (effectCalled.current) return;

        effectCalled.current = true;

        if (quizId === undefined) return;

        axios
          .post(BASE_URL + `/start?quizId=${parseInt(quizId)}`)
          .then((response) => response.data)
          .then((data) => {
            if (data.length && data[0].message === "success")
              setRoundId(data[0].id);
            else setRoundId(null);
          });
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  }, [quizId]);

  if (!roundId)
    return (
      <div className="flex flex-col gap-y-12;">
        <h1> Quiz missing </h1>
      </div>
    );

  return (
    <section className="w-full bg-light">
      <div className=" text-dark font-bold justify-center">
        <h1> Are you ready to start </h1>

        <Link to={`/question/${quizId}/${roundId}`}>
          <div className="bg-light w-full p-8 flex justify-center font-sans">
            <button className="bg-darkest hover:bg-gray-400 text-lightest font-bold py-2 px-4 rounded-l;">
              Start
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Quiz;
