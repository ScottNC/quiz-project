import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";

interface Results {
  answered: number;
  correct: number;
  questionCount: number;
}

const Result: React.FC = () => {
  const [results, setResults] = useState<Results[]>([]);
  const effectCalled = useRef<boolean>(false);

  const round_id = 10; // hardcoded should be passed from previous page

  useEffect(() => {
    if (effectCalled.current) return;
    fetchRound();
    effectCalled.current = true;
  }, []);

  const fetchRound = async () => {
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
        <h2 >
          You got {results[0].correct} out of {results[0].questionCount}
        </h2>
    </section>
  );
};

export default Result;
