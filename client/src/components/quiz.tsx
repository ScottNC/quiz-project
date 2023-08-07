import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";

interface Start {
  id: number;
  message: string;
}

const Quiz: React.FC = () => {
  const [starts, setStarts] = useState<Start[]>([]);
  const effectCalled = useRef<boolean>(false);

  const quiz_id = 77; // hardcoded should be passed from previous quiz page

  useEffect(() => {
    if (effectCalled.current) return;
    postStarts();
    effectCalled.current = true;
  }, []);

  const postStarts = async () => {
    try {
      const response = await axios.post(BASE_URL + "/start", {
        params: { quizId: quiz_id },
      });
      setStarts(response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <section>
      <h1> Welcome to the Start page</h1>
      <ul>
        {starts.map((start) => (
          <li key={start.id}>{start.message}</li>
        ))}
      </ul>
    </section>
  );
};

export default Quiz;
