import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({title, targetTime}) {
    const [timerExpired, setTimerExpired] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const timer = useRef();
    function handleStart(){
        timer.current = setTimeout(() => {setTimerExpired(true)}, targetTime * 1000);
        setTimerStarted(true);
    }
    function handleStop(){
        clearTimeout(timer.current)
    }
    return (
        <>
            {timerExpired && <ResultModal targetTime={targetTime} result={"Lost"}/>}
            <section className="challenge">
                <h2>{title}</h2>
                {timerExpired && <p>You lost</p>}
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