import {useState} from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";

function App() {
    const [activePlayer, setActivePlayer] = useState('X');
    function handleSelectSquare(){
        setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initName={"player 1"} symbol={"X"} isActive={activePlayer === 'X'}/>
          <Player initName={"player 2"} symbol={"O"} isActive={activePlayer === 'O'}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} activePlayer={activePlayer} />
      </div>
    </main>
  )
}

export default App
