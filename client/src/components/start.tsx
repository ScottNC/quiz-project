import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";

interface Start {
  id: number;
  message: string;
}

const Start: React.FC = () => {
  const [starts, setStarts] = useState<Start[]>([]);
  const effectCalled = useRef<boolean>(false);

  // Replace the hardcoded quiz_id with the actual value you want to pass from the previous page
  const quiz_id = 77; // Replace this with the actual quiz_id value

  useEffect(() => {
    if (effectCalled.current) return;
    postStarts(); // Pass the quiz_id to the postStarts function
    effectCalled.current = true;
  }, []);

  const postStarts = async () => {
    try {
      const response = await axios.post<Start[]>(`${BASE_URL}/start?quizId=${quiz_id}`);
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

export default Start;
