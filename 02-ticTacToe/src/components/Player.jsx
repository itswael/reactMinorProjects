import {useState} from "react";
export default function Player({initName, symbol, isActive, onNameChange}) {
    const [name, setName] = useState(initName);
    const [isEditing, setIsEditing] = useState(false);

    function handleButton(){
        setIsEditing(editing => !editing);
        isEditing && onNameChange(symbol, name)
    }

    function handleInputChange(event){
        setName(name => event.target.value);
    }

    let buttonText = isEditing?"Save":"Edit"

    return (
        <li className={isActive ? "active" : ""}>
            <span className="player">
              {!isEditing?
                  <span className="player-name">{name}</span>:
                  <input type="text" defaultValue={name}
                         onChange={handleInputChange}/>
              }
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleButton}>{buttonText}</button>
        </li>
    );
}