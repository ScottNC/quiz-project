import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_HEALTH } from "../helpers/base_url";

const Health: React.FC = () => {
  const [health, setHealth] = useState<string>('');

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await axios.get(BASE_HEALTH + "/health");
        setHealth(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHealth();
  }, []);

  return (
    <section className="w-full bg-light">
      <h1 className="text-2xl text-dark font-bold  text-center">Welcome to the Health Page</h1>
      <h2 className="text-2xl text-dark font-bold  text-center">{health}</h2>
    </section>
  );
};

export default Health;
