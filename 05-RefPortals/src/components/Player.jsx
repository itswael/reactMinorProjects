import {useState} from "react";

export default function Player() {
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleClick(){
        setSubmitted(true);
    }
    return (
        <section id="player">
            <h2>Welcome {submitted && name}</h2>
            <p>
                <input type="text" onChange={handleNameChange} />
                <button onClick={handleClick}>Set Name</button>
            </p>
        </section>
    )
}
