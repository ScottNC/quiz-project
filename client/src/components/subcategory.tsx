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

  const number_of_returns = 5; // how many quiz options we want to bring back

  useEffect(() => {
    if (effectCalled.current) return;
    fetchQuizzes();
    effectCalled.current = true;
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(BASE_URL + "/quiz", {
        params: { categoryId: categoryId, numberOfReturns: number_of_returns },
      });

      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section>
      <h1> Please select a Quiz</h1>

      {quizzes.map((quiz) => (
        <Link to={`/quiz/${quiz.id}`}>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l;"
            key={quiz.id}
          >
            {quiz.name}
          </button>
        </Link>
      ))}
    </section>
  );
};

export default Subcategory;
