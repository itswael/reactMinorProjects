import QuizCompleteLogo from "../assets/quiz-complete.png";
import Questions from "../questions.js";

export default function Summary({userAnswers}){
    const skippedAnswers = userAnswers.filter(answer => answer === null)
    const correctAnswers = userAnswers.filter((answer, index) => answer === Questions[index].answers[0])
    const incorrectAnswers = userAnswers.length - (correctAnswers.length + skippedAnswers.length)

    return <div id={"summary"}>
        <img src={QuizCompleteLogo} alt="Quiz Complete" />
        <h2>Quiz Complete!</h2>
        <div id={"summary-stats"}>
            <p>
                <span className={"number"}>{skippedAnswers.length}</span>
                <span className={"text"}>skipped</span>
            </p>
            <p>
                <span className={"number"}>{correctAnswers.length}</span>
                <span className={"text"}>answered correctly</span>
            </p>
            <p>
                <span className={"number"}>{incorrectAnswers}</span>
                <span className={"text"}>answered incorrectly</span>
            </p>
        </div>
        <ol>
            {userAnswers.map((answer, index) => {
                let cssClass = 'user-answer'

                if (answer === null) {
                    cssClass += ' skipped'
                }else if (answer === Questions[index].answers[0]){
                    cssClass += ' correct'
                }else{
                    cssClass += ' wrong'
                }

                return (
                    <li key={index}>
                        <h3>{index + 1}</h3>
                        <p className={"question"}>{Questions[index].text}</p>
                        <p className={cssClass} >{answer ?? 'skipped'}</p>
                    </li>
                )
            })}
        </ol>
    </div>
}