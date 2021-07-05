export type Options = {
  text: string;
  isCorrect: boolean;
};

export type Questions = {
  question: string;
  points: number;
  negativePoints: number;
  options: Options[];
};

export type Quizzes = {
  quizName: string;
  level: string;
  coverImage: string;
  questions: Questions[];
};

export type QuizzesArray = {
  quizSet: Quizzes[];
};
