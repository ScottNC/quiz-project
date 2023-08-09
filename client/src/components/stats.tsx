import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { useParams } from "react-router-dom";
import { Stats } from "./types/quiz_types";

const StatsPage: React.FC = () => {
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

  return stats.length ? (
    <section className="w-full bg-light">
      <table>
        <tbody>
          <tr className=" text-darkest font-bold text-center">
            <th>Quizzes Played Today:</th>
            <th>Quizzes Played Total:</th>
          </tr>
          <tr className=" text-darkest text-center">
            <td>{stats[0].played_today}</td>
            <td>{stats[0].played_total}</td>
          </tr>
          <tr className=" text-darkest font-bold text-center">
            <th>Average Score Today:</th>
            <th>Average Score Today:</th>
          </tr>
          <tr className=" text-darkest text-center">
            <td>
              {Math.round(
                (stats[0].correct_today * 100) / stats[0].answered_today
              )}
              %
            </td>
            <td>
              {Math.round(
                (stats[0].correct_total * 100) / stats[0].answered_total
              )}
              %
            </td>
          </tr>
          <tr className=" text-darkest font-bold text-center">
            <th>Favourite Quiz:</th>
            <th>Favourite Topic:</th>
          </tr>
          <tr className=" text-darkest text-center">
            <td>{stats[0].quiz}</td>
            <td>{stats[0].topic}</td>
          </tr>
        </tbody>
      </table>
    </section>
  ) : (
    <section>
    </section>
  );
};

export default StatsPage;
