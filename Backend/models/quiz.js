const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

//SCHEMA FOR QUESTION
const quizSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        index:true,
        unique:true,
    },
    startTime:{
        type:String,
        require:true,
    },
    runTime:{
        type:String,
        require:true,
    },
    questions:[{type:String}]
    },
    {timestamps:true}
);

const Quiz = mongoose.model('Quiz',quizSchema);
module.exports = Quiz;