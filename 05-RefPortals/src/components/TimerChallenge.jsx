import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({title, targetTime}) {
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const timer = useRef();
    const dialog = useRef();
    const timerStarted = timeRemaining > 0 && timeRemaining < targetTime;

    if (timeRemaining <= 0){
        clearInterval(timer.current);
        dialog.current.open()
    }
    function handleClose() {
        setTimeRemaining(targetTime * 1000);
    }
    function handleStart(){
        timer.current = setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 10);
            dialog.current.open();
        }, 10);
    }
    function handleStop(){
        dialog.current.open();
        clearInterval(timer.current)
    }
    return (
        <>
            <ResultModal ref = {dialog} targetTime={targetTime} onClose={handleClose} remainingTime={timeRemaining}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className={"challenge-time"}>
                    {targetTime} second{targetTime>1?'s':''}
                </p>
                <p>
                    <button onClick={timerStarted ? handleStop : handleStart}>
                        {timerStarted? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                {   timerStarted ?
                    <p className='active'>
                        Time is running..
                    </p> :
                    <p>
                        Timer Inactive
                    </p>
                }
            </section>
        </>
    )

}