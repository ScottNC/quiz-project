import axios from "axios";
import { BASE_URL } from "../helpers/base_url";

interface PutAnswerResponse {
  message: string;
  finished: boolean;
}

export const storeAnswer = async (
  roundId: number,
  questionNumber: number,
  correct: boolean
): Promise<PutAnswerResponse> => {
  try {
    const response = await axios.put(`${BASE_URL}/answer`, {
      roundId,
      questionNumber,
      correct,
    });
    return response.data;
  } catch (error) {
    console.error("Error putting answer:", error);
    throw error;
  }
};
