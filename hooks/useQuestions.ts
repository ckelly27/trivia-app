import { useState, useEffect } from 'react';

export interface Question {
  category: string;
  type: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  // shuffled options for answers
  options: string[]; 
}

export default function useQuestions(endpoint: string) {

  // stores array of questions (batches of 10)
  const [questions, setQuestions] = useState<Question[]>([]);
  // stores index of the question in the array
  const [questionIndex, setQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // get initial set of quesions
  useEffect(() => {
      fetchQuestions();
  }, [endpoint]);

  // return an array of the answer options, shuffled
  const shuffleAnswers = (correct: string, incorrect: string[]) => {
      const all = [...incorrect, correct];
      return all.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = () => {
    const nextIndex = questionIndex + 1;
    if (nextIndex > questions.length) {
      fetchQuestions();
      // reset question index to 0 upon retrieving new batch
      setQuestionIndex(0)
    }
    // otherwise increment index
    else {
      setQuestionIndex(nextIndex);
    }
  }

  // converts html entities to 'normal' text/string
  const decodeHtml = (html: string) => {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
  };

  const fetchQuestions = async () => {
    setLoading(true);

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        
        // convert data into array of question objects
        const formattedQuestions: Question[] = data.results.map((q: any) => ({
          ...q,
          question: decodeHtml(q.question),
          correct_answer: decodeHtml(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map((ans: string) => decodeHtml(ans)),
          options: shuffleAnswers(q.correct_answer, q.incorrect_answers.map((ans: string) => decodeHtml(ans))),
        }));

        // set use state of the question array to the newly created one above
        setQuestions(prev => [...prev, ...formattedQuestions]);
    }
    catch (error) {
      console.log("there was an error: ", error);
    }
    finally {
      setLoading(false);
    }
  }

  const currentQuestion = questions[questionIndex];

  return { currentQuestion, handleAnswer, loading, questionIndex };
}

