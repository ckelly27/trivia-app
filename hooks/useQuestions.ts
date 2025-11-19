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
    const [questionIndex, setQuestionIndex] = useState(10)
    const [loading, setLoading] = useState(false)

    // return an array of the answer options, shuffled
    const shuffleAnswers = (correct: string, incorrect: string[]) => {
        const all = [...incorrect, correct];
        return all.sort(() => Math.random() - 0.5);
    };

    // converts html entities to 'normal' text/string
    const decodeHtml = (html: string) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    const fetchQuestions = async () => {
    setLoading(true)

    try {
        const response = await fetch(endpoint)
        const data = await response.json()
    }
    catch (error) {
      console.log("there was an error: ", error)
    }
    finally {
      setLoading(false)
    }

    // get initial set of quesions
    useEffect(() => {
        fetchQuestions();
    }, [endpoint]);
  }
}

