import {useState, useRef, useCallback} from "react";
import QUESTIONS from "../questions.js"
import QuizCompleteLogo from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import Question from "./Question.jsx";

export default function Quiz(){
    const [answerState, setAnswerState] = useState('')
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length-1
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
        setAnswerState('Answered')
        setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
                setAnswerState('correct')
            }else{
                setAnswerState('wrong')
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000)

        }, 1000)
    }, [activeQuestionIndex])

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
                      questionText={QUESTIONS[activeQuestionIndex].text}
                      answers={QUESTIONS[activeQuestionIndex].answers}
                      onSelectAnswer={handleSelectAnswer}
                      selectedAnswer={userAnswers[userAnswers.length -1]}
                      onSkipAnswer={handleSkipAnswer} />
        </div>
    )
}