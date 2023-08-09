export type Answer = {
  answerId: `${number}`,
  answer: string,
}

export type Question = {
  id: `${number}`,
  questionText: string,
  multipleChoice: boolean,
  finalQuestion: boolean,
  answers: Answer[]
}

export type Quiz = {
  id: `${number}`,
  name: string
}

export type Category = {
  id: `${number}`,
  name: string
}

export type Subcategory = {
  id: `${number}`,
  name: string
}

export type Result = {
  quizId: number,
  answered: number,
  correct: number,
  questionCount: number
}


export type CurrentQuestion = {
  answered: number;
  status: string;
}

export type CorrectAnswer = {
  correctAnswerId: number;
}

export type Stats = {
  played_today: number;
  played_total: number;
  correct_today: number;
  correct_total: number;
  answered_today: number;
  answered_total: number;
  quiz: string;
  topic: string;
}

export type Name = {
  name: string;
}