import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { useParams } from "react-router-dom";

interface Stats {
  played_today: number;
  played_total: number;
  correct_today: number;
  correct_total: number;
  answered_today: number;
  answered_total: number;
  quiz: string;
  topic: string
}

const Stats: React.FC = () => {
  const [stats, setStats] = useState<Stats[]>([]);
  const effectCalled = useRef<boolean>(false);

  const { roundId } = useParams<{
    roundId: string;
  }>();

  useEffect(() => {
    if (effectCalled.current) return;
    effectCalled.current = true;
    const fetchRound = async () => {
      try {
        const response = await axios.get(BASE_URL + "/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRound();
  }, [roundId]);

  return stats.length? (
    <section>
      <table>
          <tbody>
            <tr>
              <th>Quizzes Played Today:</th>
              <th>Quizzes Played Total:</th>
            </tr>
            <tr>
              <td>{stats[0].played_today}</td>
              <td>{stats[0].played_total}</td>
            </tr>
            <tr>
              <th>Average Score Today:</th>
              <th>Average Score Today:</th>
            </tr>
            <tr>
              <td>{Math.round(stats[0].correct_today * 100 / stats[0].answered_today)}%</td>
              <td>{Math.round(stats[0].correct_total * 100 / stats[0].answered_total)}%</td>
            </tr>
            <tr>
              <th>Favourite Quiz:</th>
              <th>Favourite Topic:</th>
            </tr>
            <tr>
              <td>{stats[0].quiz}</td>
              <td>{stats[0].topic}</td>
            </tr>
          </tbody>
        </table>
    </section>
  ) : (
    <section>
      <p>
        Loading Stats...
      </p>
    </section>
  );
};

export default Stats;
