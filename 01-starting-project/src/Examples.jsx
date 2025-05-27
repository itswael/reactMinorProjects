import TabButton from "./TabButton";
import {EXAMPLES} from "./data";
import {useState} from "react";
import Section from "./Section";
import Tabs from "./Tabs";

export default function Example() {
    const [topic, setTopic] = useState("");
    function handleSelect(selectedButton) {
        setTopic(selectedButton);
    }
    return (
        <Section id="examples" title="Examples">
            <Tabs
                ButtonContainer="menu"
                buttons = {<>
                <TabButton onClick={() => handleSelect("components")} isSelected={topic === "components"}>Components</TabButton>
                <TabButton onClick={() => handleSelect("jsx")} isSelected={topic === "jsx"}>JSX</TabButton>
                <TabButton onClick={() => handleSelect("props")} isSelected={topic === "props"}>Props</TabButton>
                <TabButton onClick={() => handleSelect("state")} isSelected={topic === "state"}>State</TabButton>
                </>
            }>
                {!topic && <p>Select a topic to see an example.</p>}
                {topic && (
                    <div id="tab-content">
                        <h3>{EXAMPLES[topic].title}</h3>
                        <p>{EXAMPLES[topic].description}</p>
                        <pre><code>{EXAMPLES[topic].code}</code></pre>
                    </div>
                )}
            </Tabs>
        </Section>
    )
}