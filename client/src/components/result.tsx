import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";

interface Result {
  id: number;
  name: string;
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
      <h1> Welcome to the Results page</h1>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default Result;
