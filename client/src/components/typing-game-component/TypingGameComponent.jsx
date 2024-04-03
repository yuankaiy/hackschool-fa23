import React, {useState } from "react";
import useTypingGame, {PhaseType} from "react-typing-game-hook"; // for playing the game
// Make sure to run `npm install react-typing-game-hook` to install the typing game hook
import styles from "./TypingGameComponent.module.css";
import axios from 'axios'

//Currently using a hard coded sentence bank
const sentenceData = [
  "The sun rose over the horizon, casting a warm golden glow.",
  "She sipped her coffee and watched the raindrops dance on the windowpane.",
  "The old oak tree stood tall and majestic in the middle of the field.",
  "The cat curled up on the windowsill, purring contentedly.",
  "In the quiet of the night, the stars twinkled like diamonds in the sky.",
  "The aroma of freshly baked bread wafted through the air.",
  "He gazed at the old photo, lost in memories of days gone by.",
  "The waves crashed against the rocky shore, creating a soothing melody.",
  "The laughter of children echoed through the park as they played.",
  "The detective examined the clues carefully, searching for answers.",
  "She opened the dusty book and was transported to a different world.",
  "The cityscape glittered with lights as night fell.",
  "The chef carefully seasoned the dish with a pinch of salt.",
  "The hiker reached the summit and marveled at the breathtaking view.",
  "The clock ticked relentlessly, marking the passage of time.",
];

const TypingGameComponent = () => {
  //TODO Create a useState called gameStarted with the function setGameStarted and intialize it to false
  const [gameStarted, setGameStarted] = useState(false);
  //TODO Create a useState called selectedSentence with the funciton setSelectedSentence and initialize it to the first sentence in sentenceData
  const [selectedSentence, setSelectedSentence] = useState(sentenceData[0]);
  const [statsObject, setStatsObject] = useState(null);
  // useTypingGame to keep track of, and modify chars being typed and other stuff
  const {
    states: { chars, charsState, phase, correctChar, errorChar},
    actions: { insertTyping, resetTyping, deleteTyping, getDuration },
  } = useTypingGame(selectedSentence,{
    skipCurrentWordOnSpace: true,
    pauseOnError: false,
    countErrors: "everytime",
  });

  // triggered when start button is clicked
  // updates setGameStart
  const handleGameStart = () => {
    console.log("handleGameStart triggered");
    if (phase === PhaseType.NotStarted) {
      console.log(phase);
      resetTyping();
      //TODO Set the gameStarted state to true
      setGameStarted(true);
    }
  };
const sendGameStats = async (stats) => {
  try {
    const response = await axios.post("http://localhost:3000", stats);
    console.log(response.data);
  } catch (error) {
    console.error("Failed to create/update game stats:", error);
  }
};

const calculateWPM = () => {
  let numWords = selectedSentence.split(" ").length;
  let time = getDuration()/1000/60;
  return numWords/time;
};

const handleGameEnd = () => {
  let stats = {
    sentence: chars,
    correctCharacters: correctChar,
    incorrectCharacters: errorChar,
    wpm: calculateWPM().toFixed(2),
    time: (getDuration()/1000/60).toFixed(2),
  }
  // TODO: change statsObject to include stats
  // TODO: call sendGameStats(param)
  
};

useEffect(()=> {
  if(phase === PhaseType.Started && charsState.length === chars.length + 1){
    handleGameEnd();
  }
}, [phase, charsState.length]);


// phase should be equal to PhaseType.Started
// Length of charsState should be equal to length of chars + 1


  // here, we render the game
  return (
    <div className={styles.typing_game}>
      { !gameStarted ?  (
        <div className={styles.start_game}>
          <div className={styles.sentence_dropdown}>
            {/* TODO Create a h3 that says "Select a Sentence" */}
            
            
            {/* TODO Create a select HTML tag with the options as the sentenceData */}
            <select
              name="sentence-select"
              id={styles.sentence_selector}
              onChange={(e) => setSelectedSentence(e.target.value)}
            >
              {sentenceData.map((sentence, index) => (
                <option key={index}>{sentence}</option>
              ))}
            </select>
            {/* Iterate through the sentenceData array to dynamically and create an option for each sentence*/}
            {/* Hint use .map */}
            {/* Set the selectedSentence state to be selected sentence from the dropdown using the onChange attribute*/}

        </div>
          {/* TODO Create a button that calls handleGameStart when clicked */}
          <button onClick={() => handleGameStart(true)}>Start Game</button>
        </div>
      ) : (
        <div className={styles.typing_component}>
        <p>Click on the sentence below and start typing!</p>
        <h2 
            onKeyDown={(e) => {
                // call different functions based on the key clicked
                const key = e.key;
                if (key === "Escape") {
                    // we can potentially change it from escape char to a button lmk tho
                    resetTyping();
                } else if (key === "Backspace") {
                    deleteTyping(false);
                } else if (key.length === 1) {
                    insertTyping(key);
                }
                // preventDefault makes sure that the keys dont do what they normally do, and instead
                // execute the functions that we have specified above
                e.preventDefault();
            }}
            tabIndex={0}
            onBlur={handleGameEnd} // when the user clicks away from the component (which is in <h1> rn)
        >
        {chars.split("").map((char, index) => {
            let state = charsState[index]; // check state at curr pos
            // if not done -> black
            // if correct -> green
            // else red
            let color = state === 0 ? "#292F36" : state === 1 ? "#417B5A" : "#FF6B6B";
            return (
                <span key={char + index} style={{ color }}>
                    {char}
                </span>
            );
        })}
        </h2>
</div>

      )}
    </div>
  );
};

// exporting the typing game component here
export default TypingGameComponent;
// wooooo
