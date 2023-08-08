import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { useParams } from "react-router-dom";

interface Results {
  answered: number;
  correct: number;
  questionCount: number;
}

const Result: React.FC = () => {
  const [results, setResults] = useState<Results[]>([]);
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
          params: { roundId : parseInt(roundId ?? '1') },
        });
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRound();
  }, [roundId]);

  return results.length? (
    <section>
      <h1> Welcome to the Results page</h1>
        <h2 >
          You have scored {results[0].correct} out of {results[0].questionCount}!
        </h2>
    </section>
  ) : (
    <section>
      <h2 >
        Loading Results...
      </h2>
    </section>
  );
};

export default Result;
