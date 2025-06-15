import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import {useState} from "react";
import Questions from "../questions.js";

export default function Question({index, onSelectAnswer, onSkipAnswer}) {
    const [answer, setAnswer] = useState({
        selectedAnswer:'',
        isCorrect: null
    })

    let timer = 10000;

    if (answer.selectedAnswer) {
        timer = 1000;
    }

    if (answer.isCorrect !== null){
        timer = 2000
    }

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: answer === Questions[index].answers[0]
            })

            setTimeout(() => {
                onSelectAnswer(answer)
            }, 2000)

        }, 1000)
    }

    let answerState = ''
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong'
    }else if (answer.selectedAnswer){
        answerState = 'answered'
    }
    return <div id={"question"}>
        <QuestionTimer key={timer}
                       timeout={timer}
                       onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
                       mode={answerState}
        />

        <h2>{Questions[index].text}</h2>

        <Answers answers={Questions[index].answers}
                 selectedAnswers={answer.selectedAnswer}
                 answerState={answerState}
                 onSelect={handleSelectAnswer} />
    </div>
}