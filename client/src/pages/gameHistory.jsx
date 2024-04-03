// Import the GameHistory component
import React, { useState, useEffect } from "react";
import styles from '../styles/Home.module.css';
import CardComponent from '@/components/game-history-component/gameHistory';
import axios from "axios"

export default function History() {
    const [gameStats, setGameStats] = useState([])
    const fetchData = async () => {
        try {

        }
        catch(error) {
            console.error("Failed to fetch game stats:", error);
        };
    }
}

export default function GameHistory() {
    return (
        <div className={styles.container}>
            <h1>Previous Games</h1>

            {/* Container for top 3 games */}
            <div className={styles.top_three}>
                <h3 className={styles.header}>Top 3 Games</h3>
                <div className={styles.top_three_cards}>
                    <CardComponenet sentence={"This was the fastest typed sentence"}/>
                    <CardComponenet wpm={67}/>
                    <CardComponenet incorrectCharacters={7}/>
                </div>
            </div>



            {/* Container for all games */}
            <div className={styles.all_games}>
                <h3 className={styles.header}>All games</h3>
                <div className={styles.all_cards}>
                    <CardComponenet sentence={"This was the fastest typed sentence"}/>
                    <CardComponenet wpm={67}/>
                    <CardComponenet incorrectCharacters={8}/>
                </div>
            </div>
        </div>
    );
}