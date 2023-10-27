const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

//SCHEMA FOR QUESTION
const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        require:true,
        index:true,
        unique:true,
    },
    op_a:{
        type:String,
        require:true,
    },
    op_b:{
        type:String,
        require:true,
    },
    op_c:{
        type:String,
        require:true,
    },
    op_d:{
        type:String,
        require:true,
    },
    ans:{
        type:String,
        require:true,
    },
    exp:{
        type:String,
    }},
    {timestamps:true}
);

const Question = mongoose.model('Question',questionSchema);
module.exports = Question;