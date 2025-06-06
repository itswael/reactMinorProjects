import {useState} from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./components/winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

function deriveActivePlayer(gameTurns){
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
    }
    return currentPlayer
}

function updateGameBoard(gameTurns){
    let gameBoard = [...initialGameBoard.map(row => [...row])];
    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function findWinner(gameBoard){
    let winner;
    for (const combination of WINNING_COMBINATIONS){
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol){
            winner = firstSquareSymbol;
        }
    }

    return winner;
}

function App() {
    const [players, setPlayers] = useState({
        "X": "Player1",
        "O": "Player2",
    });
    const [gameTurns, setGameTurns] = useState([]);
    //const [activePlayer, setActivePlayer] = useState('X');
    const activePlayer = deriveActivePlayer(gameTurns);

    const gameBoard = updateGameBoard(gameTurns);
    const winner = players[findWinner(gameBoard)];
    const hasDraw = gameTurns.length===9 && !winner

    function handlePlayerNames(symbol, name){
        setPlayers(prevPlayers =>{
           return {
                ...players,
                [symbol]:name
            };

        });
    }

    function handleSelectSquare(rowIndex, colIndex) {
        //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
        setGameTurns((prevTurns) => {
            const currentPlayer = deriveActivePlayer(prevTurns);
            const updatedTurns = [{
                square: { row: rowIndex, col: colIndex },player: currentPlayer,},
                ...prevTurns
            ]
            return updatedTurns
        })
    }

    function handleRestart(){
        setGameTurns((prevTurns) => [])
    }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initName={"player 1"} symbol={"X"} isActive={activePlayer === 'X'} onNameChange={handlePlayerNames}/>
          <Player initName={"player 2"} symbol={"O"} isActive={activePlayer === 'O'} onNameChange={handlePlayerNames}/>
        </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard}/>
      </div>
      <div>
        <Log gameTurns={gameTurns} />
      </div>
    </main>
  )
}

export default App
