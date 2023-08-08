export type Answer = {
  answerId: `${number}`,
  answer: string,
}

export type Question = {
  id: `${number}`,
  questionText: string,
  multipleChoice: boolean,
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
  answered: number,
  correct: number,
  questionCount: number
}