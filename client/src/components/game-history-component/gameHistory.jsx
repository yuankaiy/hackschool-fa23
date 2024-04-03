import styles from './gameHistory.module.css';

// Create a functional component that will display game history
// Remember to return one top-level div, and nest the rest of your elements inside of it
// It should take in props for the sentence, correctChars, incorrectChars, wpm, and time
// Export your GameHistory component!

const CardComponent = ({sentence, correctChars, incorrectChars, wpm, time}) => {
    return (
        <div className={styles.card}>
            <p className={styles.cardContent}><b>Sentence: </b>{sentence}</p>
            <p className={styles.cardContent}><b>Correct Characters: </b>{correctChars}</p>
            <p className={styles.cardContent}><b>Incorrect Characters: </b>{incorrectChars}</p>
            <p className={styles.cardContent}><b>WPM: </b>{wpm}</p>
            <p className={styles.cardContent}><b>Time:</b> {time}</p>
        </div>
    )
}

export default CardComponent;