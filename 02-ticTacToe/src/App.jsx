import {useState} from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

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
    const [gameTurns, setGameTurns] = useState([]);
    //const [activePlayer, setActivePlayer] = useState('X');
    const activePlayer = deriveActivePlayer(gameTurns);

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
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initName={"player 1"} symbol={"X"} isActive={activePlayer === 'X'}/>
          <Player initName={"player 2"} symbol={"O"} isActive={activePlayer === 'O'}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
      </div>
      <div>
        <Log gameTurns={gameTurns} />
      </div>
    </main>
  )
}

export default App
