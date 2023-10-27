const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

//SCHEMA FOR QUESTION
const quizSubmissionSchema = new mongoose.Schema({
    id:{
        type:ObjectId,
        require:true,
    },
    answer:{type:Array,"default" : [] },
    },
    {timestamps:true}
);

const QuizSubmission = mongoose.model('quizSubmission',quizSubmissionSchema);
module.exports = QuizSubmission;