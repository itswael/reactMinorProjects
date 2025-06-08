import {useRef, useImperativeHandle} from "react";
import {createPortal} from "react-dom";

export default function ResultModal({ref, remainingTime, onClose, targetTime}) {
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open(){
                dialog.current.showModal();
            }
        }
    })
    return createPortal(
        <dialog ref = {dialog} className="result-modal">
            <h2>You {remainingTime>0? "Won" : "Lost"}</h2>
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with {(remainingTime/1000).toFixed(2)} seconds left.</p>
            <form method="dialog" onSubmit={onClose}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")
    )
}