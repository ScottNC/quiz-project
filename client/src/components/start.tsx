import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";

interface Start {
  id: number;
  name: string;
}

const Start: React.FC = () => {
  const [starts, setStarts] = useState<Start[]>([]);
  const effectCalled = useRef<boolean>(false);

  const quiz_id = 77; // hardcoded should be passed from previous page

  useEffect(() => {
    if (effectCalled.current) return;
    fetchStarts();
    effectCalled.current = true;
  }, []);

  const fetchStarts = async () => {
    try {
      const response = await axios.get(BASE_URL + "/start", {
        params: { quizId: quiz_id },
      });
      setStarts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section>
      <h1> Welcome to the Results page</h1>
      <ul>
        {starts.map((start) => (
          <li key={start.id}>{start.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default Start;
