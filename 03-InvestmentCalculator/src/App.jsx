import Header from './components/Header.jsx'
import UserInput from "./components/UserInput.jsx";
import {useState} from "react";
import Results from "./components/Results.jsx";
function App() {
  const [userInput, setUserInput] =useState({
    initialInvestment:1000,
    annualInvestment:1200,
    expectedReturn:6,
    duration:10
  });

  function handleChange(inputIdentifier, newValue) {
    setUserInput(prevUserInput => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue,
      }
    });
  }

  const inputIsValid = userInput["duration"]>0
  return (
      <>
        <Header/>
        <UserInput handleChange={handleChange} userInput={userInput} />
        {!inputIsValid && <p className="center">Please enter a duration greater than 0</p>}
        {inputIsValid && <Results input={userInput} />}
      </>
  )
}

export default App
