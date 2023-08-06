import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";

interface Result {
  answered: number;
  correct: number;
  questionCount: number;
}

const Result: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const effectCalled = useRef<boolean>(false);

  const round_id = 1; // hardcoded should be passed from previous page

  useEffect(() => {
    if (effectCalled.current) return;
    fetchSubcategories();
    effectCalled.current = true;
  }, []);

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(BASE_URL + "/result", {
        params: { roundId: round_id },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section>
      <h1> Welcome to the Result page</h1>

      {results.map((result) => (
        <h2>
          You got {result.correct} out of {result.questionCount}
        </h2>
      ))}
    </section>
  );
};

export default Result;
