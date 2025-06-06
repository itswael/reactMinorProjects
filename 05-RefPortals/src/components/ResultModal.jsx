export default function ResultModal({result, targetTime = 0}) {
    return (
        <dialog className="result-modal" open>
            <h2>You {result}</h2>
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with X seconds left.</p>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    )
}