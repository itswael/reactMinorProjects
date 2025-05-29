export default function Log({gameTurns}) {
    return (<ol id="log">
        {gameTurns.map(turn =>
            <li>{turn.player}</li>
            )}
    </ol>)
}