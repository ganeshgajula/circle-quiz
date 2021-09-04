// import { QuizzesArray } from "../types/quiz.types";

const quizzes = {
  quizSet: [
    {
      quizName: "Test your basics",
      level: "Beginner",
      coverImage:
        "https://res.cloudinary.com/circler/image/upload/c_thumb,w_200,g_face/v1625496117/beginner-level_ecdspx.jpg",
      questions: [
        {
          question: "When should you begin saving your money?",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Right away.",
              isCorrect: true,
            },
            {
              text: "When you finish high school",
              isCorrect: false,
            },
            {
              text: "When you reach retirement",
              isCorrect: false,
            },
            {
              text: "When you are 30",
              isCorrect: false,
            },
          ],
        },
        {
          question: "NIFTY consists of",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Top 50 Companies from India",
              isCorrect: false,
            },
            {
              text: "Top 50 Companies listed on NSE",
              isCorrect: true,
            },
            {
              text: "Top 30 Companies from BSE",
              isCorrect: false,
            },
          ],
        },
        {
          question: "Indian stock markets movements are influenced by:",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Global factors",
              isCorrect: false,
            },
            {
              text: "Domestic factors",
              isCorrect: false,
            },
            {
              text: "All of the above",
              isCorrect: true,
            },
          ],
        },
        {
          question: "The Oldest Stock Market in India is:",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Bombay Stock Exchange",
              isCorrect: true,
            },
            {
              text: "Delhi Stock Exchange",
              isCorrect: false,
            },
            {
              text: "National Stock Exchange",
              isCorrect: false,
            },
          ],
        },
        {
          question: "What is a credit card?",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "A loan that has to be paid off every month.",
              isCorrect: false,
            },
            {
              text: "An arrangement by which you can buy something now, with the promise that you will pay for it in the future.",
              isCorrect: false,
            },
            {
              text: "A money substitute for items you cannot afford.",
              isCorrect: false,
            },
            {
              text: "All of the above",
              isCorrect: true,
            },
          ],
        },
        {
          question: "How can you build a good credit history?",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Only use your credit card when you know you can afford to use it.",
              isCorrect: false,
            },
            {
              text: "Be reliable, stay within your affordable budget.",
              isCorrect: false,
            },
            {
              text: "Establish other forms of credit—like a checking account, debit card and car payments—that can help demonstrate that you are responsible.",
              isCorrect: false,
            },
            {
              text: "All of the above",
              isCorrect: true,
            },
          ],
        },
      ],
    },
    {
      quizName: "Test your fundamentals",
      level: "Intermediate",
      coverImage:
        "https://res.cloudinary.com/circler/image/upload/c_thumb,w_200,g_face/v1625497622/intermediate_kaxnzk.jpg",
      questions: [
        {
          question: "The process of issuing share to the public is called as:",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Right Issue",
              isCorrect: false,
            },
            {
              text: "Bonus Issue",
              isCorrect: false,
            },
            {
              text: "Initial Public Offer",
              isCorrect: true,
            },
          ],
        },
        {
          question: "Your piece of ownership in a company is called",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Profit",
              isCorrect: false,
            },
            {
              text: "Dividend",
              isCorrect: false,
            },
            {
              text: "Portion",
              isCorrect: false,
            },
            {
              text: "Share of stock",
              isCorrect: true,
            },
          ],
        },
        {
          question: "Stock Market participants include:",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Individual investors & traders",
              isCorrect: false,
            },
            {
              text: "Mutual funds & insurance companies",
              isCorrect: false,
            },
            {
              text: "Foreign instutional investor",
              isCorrect: false,
            },
            {
              text: "All of the above",
              isCorrect: true,
            },
          ],
        },
        {
          question:
            "Share of profit, if distributed by management in cash is called as:",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Bonus",
              isCorrect: false,
            },
            {
              text: "Rights",
              isCorrect: false,
            },
            {
              text: "Dividend",
              isCorrect: true,
            },
            {
              text: "Interest",
              isCorrect: false,
            },
          ],
        },
        {
          question: "The most aggressive mutual funds tend to be from:",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Companies that are a little younger and growing",
              isCorrect: true,
            },
            {
              text: "Companies that are older and well-established.",
              isCorrect: false,
            },
            {
              text: "Companies that are overseas",
              isCorrect: false,
            },
            {
              text: "All of the above",
              isCorrect: false,
            },
          ],
        },
        {
          question: "Which of the following is a big investing mistake?",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Investing based on emotion",
              isCorrect: false,
            },
            {
              text: "Waiting till you earn more to invest",
              isCorrect: false,
            },
            {
              text: "Trying to time the market",
              isCorrect: false,
            },
            {
              text: "All of the above",
              isCorrect: true,
            },
          ],
        },
      ],
    },
    {
      quizName: "All about investing",
      level: "Expert",
      coverImage:
        "https://res.cloudinary.com/circler/image/upload/c_thumb,w_200,g_face/v1625497974/expert-level_owjpcn.jpg",
      questions: [
        {
          question: "The Investments in Equities for long term perspective",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Can offer highest returns over other assets classes.",
              isCorrect: true,
            },
            {
              text: "Has the lowest potential of return over other assets classes.",
              isCorrect: false,
            },
          ],
        },
        {
          question: "The KISS rule of investing teaches:",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "The more sophisticated the investment, the better",
              isCorrect: false,
            },
            {
              text: "Keep things simple and never buy something you don't understand.",
              isCorrect: true,
            },
            {
              text: "It is normal to have investments you don't understand as long as you have a broker",
              isCorrect: false,
            },
            {
              text: "None of the above",
              isCorrect: false,
            },
          ],
        },
        {
          question:
            "Which of the following is a risk to consider when investing?",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Your money is not liquid",
              isCorrect: false,
            },
            {
              text: "You could lose all of your money",
              isCorrect: false,
            },
            {
              text: "Inflation",
              isCorrect: false,
            },
            {
              text: "All of the above",
              isCorrect: true,
            },
          ],
        },
        {
          question: "What is true about investing in a single stocks?",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "The risk is the same whether you invest in mutual funds or stocks.",
              isCorrect: false,
            },
            {
              text: "There is a low degree of risk.",
              isCorrect: false,
            },
            {
              text: "If the stock is from your employer, the risk is lower.",
              isCorrect: false,
            },
            {
              text: "There is a high degree of risk.",
              isCorrect: true,
            },
          ],
        },
        {
          question: "Which is NOT true about investments:",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Always invest only for tax savings purposes.",
              isCorrect: true,
            },
            {
              text: "Diversification will help lower the risk",
              isCorrect: false,
            },
            {
              text: "Never invest only for tax savings purposes.",
              isCorrect: false,
            },
            {
              text: "Never invest using borrowed money.",
              isCorrect: false,
            },
          ],
        },
        {
          question: "The best practice while investing is:",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Buying the stocks which are cheap or low priced",
              isCorrect: false,
            },
            {
              text: "Buying stocks from various sectors to diversify the risk.",
              isCorrect: true,
            },
            {
              text: "Investing all capital at once",
              isCorrect: false,
            },
            {
              text: "Buying all multibagger stocks",
              isCorrect: false,
            },
          ],
        },
      ],
    },
    {
      quizName: "Financial planning",
      level: "Elite",
      coverImage:
        "https://res.cloudinary.com/circler/image/upload/c_thumb,w_200,g_face/v1625498054/elite-level_q4kaih.jpg",
      questions: [
        {
          question:
            "Which of the following is the best place to set funds aside for “surprise” expenditures?",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "The stock market",
              isCorrect: false,
            },
            {
              text: "Your regular checking account.",
              isCorrect: false,
            },
            {
              text: "A savings account.",
              isCorrect: true,
            },
            {
              text: "Ownership of real estate.",
              isCorrect: false,
            },
          ],
        },
        {
          question:
            "A monthly budget can help you achieve financial security by",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Helping you choose stocks that are most likely to increase in price",
              isCorrect: false,
            },
            {
              text: "Reducing the likelihood that you will face unexpected expenditures for maintenance and repairs.",
              isCorrect: false,
            },
            {
              text: "Expanding the borrowing limits on your existing credit cards and increasing the number of credit cards you hold.",
              isCorrect: false,
            },
            {
              text: "Increasing your financial awareness and helping you allocate your funds more effectively.",
              isCorrect: true,
            },
          ],
        },
        {
          question:
            "When it comes to broad portfolio diversification, which one from the below should be chosen",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Index funds",
              isCorrect: true,
            },
            {
              text: "Individual stocks",
              isCorrect: false,
            },
            {
              text: "Mutual funds",
              isCorrect: false,
            },
            {
              text: "Bitcoin",
              isCorrect: false,
            },
          ],
        },
        {
          question:
            "Which of the following will help you generate income and accumulate wealth?",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Getting another credit card so you will have more borrowing power in the future.",
              isCorrect: false,
            },
            {
              text: "Borrowing funds in order to increase your current consumption.",
              isCorrect: false,
            },
            {
              text: "Setting aside funds regularly into savings and investments",
              isCorrect: true,
            },
            {
              text: "Making only the minimum monthly payment on your outstanding credit card balances.",
              isCorrect: false,
            },
          ],
        },
        {
          question: "The risk return ratio says:",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "When risk goes down, the return generally will go up.",
              isCorrect: true,
            },
            {
              text: "When the risk goes up, the return generally will go down.",
              isCorrect: false,
            },
            {
              text: "When risk goes down, the return generally will go up.",
              isCorrect: false,
            },
            {
              text: "None of the above",
              isCorrect: false,
            },
          ],
        },
        {
          question: "Personal financial success is primarily the result of",
          points: 5,
          negativePoints: 2,
          options: [
            {
              text: "Generous welfare and unemployment programs.",
              isCorrect: false,
            },
            {
              text: "Spending more than you earn.",
              isCorrect: false,
            },
            {
              text: "Doing what you are passionate about regardless of whether others value it.",
              isCorrect: false,
            },
            {
              text: "Providing services others value while working hard to achieve financial goals.",
              isCorrect: true,
            },
          ],
        },
      ],
    },
  ],
};

export { quizzes };
