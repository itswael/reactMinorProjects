import {useState, useCallback} from "react";
import QUESTIONS from "../questions.js"
import QuizCompleteLogo from "../assets/quiz-complete.png"
import Question from "./Question.jsx";

export default function Quiz(){
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length-1
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
        setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
    }, [])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return <div id={"summary"}>
                <img src={QuizCompleteLogo} alt="Quiz Complete" />
                <h2>Quiz Complete!</h2>
            </div>
    }

    return (
        <div id={"quiz"}>
            <Question key={activeQuestionIndex}
                      index={activeQuestionIndex}
                      onSelectAnswer={handleSelectAnswer}
                      onSkipAnswer={handleSkipAnswer} />
        </div>
    )
}