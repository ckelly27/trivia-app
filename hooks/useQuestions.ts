import { useState, useEffect } from 'react';

export interface Question {
  category: string;
  type: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  options: string[]; // shuffled options
}

export default function useQuestions(endpoint: string) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [endpoint]);

  const shuffleAnswers = (correct: string, incorrect: string[]) => {
    const all = [...incorrect, correct];
    return all.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = () => {
    const nextIndex = questionIndex + 1;
    if (nextIndex >= questions.length) {
      fetchQuestions();
      setQuestionIndex(0);
    } else {
      setQuestionIndex(nextIndex);
    }
  };

 const decodeHtml = (html: string): string => {
  return html
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&deg;/g, '°')
    .replace(/&Delta;/g, 'Δ') 
    .replace(/&delta;/g, 'δ')   
    .replace(/&Pi;/g, 'Π')    
    .replace(/&pi;/g, 'π');   
};

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        console.warn('No questions returned from API:', endpoint);
        setQuestions([]);
        return;
      }

      const formattedQuestions: Question[] = data.results
        .filter(
          (q: any) =>
            q &&
            q.question &&
            q.correct_answer &&
            Array.isArray(q.incorrect_answers)
        )
        .map((q: any) => ({
          ...q,
          question: decodeHtml(q.question),
          correct_answer: decodeHtml(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map((ans: string) =>
            decodeHtml(ans)
          ),
          options: shuffleAnswers(
            decodeHtml(q.correct_answer),
            q.incorrect_answers.map((ans: string) => decodeHtml(ans))
          ),
        }));

      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[questionIndex];

  return { currentQuestion, handleAnswer, loading, questionIndex };
}
