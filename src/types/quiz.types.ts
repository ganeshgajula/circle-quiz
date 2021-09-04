export type Options = {
  _id: string;
  text: string;
  isCorrect: boolean;
};

export type Questions = {
  _id: string;
  question: string;
  points: number;
  negativePoints: number;
  options: Options[];
};

export type Quizzes = {
  _id: string;
  quizName: string;
  level: string;
  coverImage: string;
  questions: Questions[];
};

export type QuizzesArray = {
  quizSet: Quizzes[];
};
