const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameSchema = new Schema({
    sentence: String, 
    correctCharacters: String,
    incorrectCharacters: String,
    wpm: Number,
    time: Number
});

const GameStats = mongoose.model("GameStats", GameSchema)

module.exports = {GameStats}