export type Options = {
  _id: number;
  text: string;
  isCorrect: boolean;
};

export type Questions = {
  _id: number;
  question: string;
  points: number;
  negativePoints: number;
  options: Options[];
};

export type Quizzes = {
  _id: number;
  quizName: string;
  level: string;
  coverImage: string;
  questions: Questions[];
};

export type QuizzesArray = {
  quizSet: Quizzes[];
};
