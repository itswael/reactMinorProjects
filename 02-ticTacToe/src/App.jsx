import Player from "./components/Player.jsx";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initName={"player 1"} symbol={"X"}/>
          <Player initName={"player 2"} symbol={"O"}/>
        </ol>
        GAME BOARD
      </div>
    </main>
  )
}

export default App
