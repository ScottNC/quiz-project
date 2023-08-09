import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { useParams, Link } from "react-router-dom";

interface Quiz {
  id: number;
  name: string;
}

const Subcategory: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const effectCalled = useRef<boolean>(false);

  const { categoryId } = useParams();

  const number_of_returns = 4; // how many quiz options we want to bring back

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(BASE_URL + "/quiz", {
          params: {
            categoryId: categoryId,
            numberOfReturns: number_of_returns,
          },
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (effectCalled.current) return;
    fetchQuizzes();
    effectCalled.current = true;
  }, [categoryId]);

  return (
    <section className="w-full bg-light">
      <div className="pt-5 h-100 text-2xl text-dark font-bold text-center">
        {" "}
        Choose a quiz, and you're ready to go!
      </div>
      <div className="flex flex-col gap-y-12;">
        {quizzes.map((quiz) => { console.log(quiz.id); return(
          <div className="w-full p-6 flex justify-center font-sans">
          <Link key={quiz.id} to={`/quiz/${quiz.id}`}>
              <button
                className="w-40 h-16 bg-dark text-lightest font-bold rounded-lg cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#40798C,0_0px_0_0_#1b70f841]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#40798C,0_15px_0_0_#1b70f841]
    border-b-[1px] border-blue-400"
              >
                {quiz.name}
              </button>
          </Link>
          </div>
        );})}
      </div>
    </section>
  );
};

export default Subcategory;
