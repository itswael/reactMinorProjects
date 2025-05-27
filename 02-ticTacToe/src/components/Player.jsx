import {useState} from "react";
export default function Player({name, symbol}){
    const [isEditing, setIsEditing] = useState(false);
    function handleButton(){
        setIsEditing(editing => !editing);
    }
    let buttonText = isEditing?"Save":"Edit"
    return (
        <li>
            <span className="player">
              {!isEditing? <span className="player-name">{name}</span>:<input type="text" defaultValue={name}/>}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleButton}>{buttonText}</button>
        </li>
    );
}