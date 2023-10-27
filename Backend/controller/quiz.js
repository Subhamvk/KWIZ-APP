const Question = require("../models/question");
const Quiz = require("../models/quiz");
const QuizSubmission = require("../models/quizsubmission");
var mongoose = require("mongoose");
const Redis = require('redis');

   

const check = (title, aa, rt) => {
  const date = new Date().toLocaleString("en-GB");
  const a = new Date(aa).toLocaleString("en-GB");

  console.log(title);

  var year = date.substring(6, 10);
  var month = date.substring(3, 5);
  var dt = date.substring(0, 2);
  var hour = date.substring(12, 14);
  var minute = date.substring(15, 17);

  var year2 = a.substring(6, 10);
  var month2 = a.substring(3, 5);
  var dt2 = a.substring(0, 2);
  var hour2 = a.substring(12, 14);
  var minute2 = a.substring(15, 17);

  if (year2 < year) return false;
  if (year > year2) return true;

  if (year == year2) {
    if (month2 < month) return false;
    if (month2 > month) return true;
    if (month == month2) {
      if (dt2 < dt) return false;
      if (dt2 > dt) return true;

      if (hour2 < hour) return false;
      if (hour2 > hour) return true;

      minute2 = Number(minute2);
      minute = Number(minute);
      rt = Number(rt);

      if (minute2 > minute) return true;
      console.log(minute2, rt, minute);
      if (minute2 + rt >= minute) return true;
    }
  }

  return false;
};
const check2 = (title, aa, rt) => {
  const date = new Date().toLocaleString("en-GB");
  const a = new Date(aa).toLocaleString("en-GB");

  console.log(title);

  var year = date.substring(6, 10);
  var month = date.substring(3, 5);
  var dt = date.substring(0, 2);
  var hour = date.substring(12, 14);
  var minute = date.substring(15, 17);

  var year2 = a.substring(6, 10);
  var month2 = a.substring(3, 5);
  var dt2 = a.substring(0, 2);
  var hour2 = a.substring(12, 14);
  var minute2 = a.substring(15, 17);

  if (year2 > year) return true;

  if (month2 > month) return true;

  if (dt2 > dt) return true;

  if (hour2 > hour) return true;

  minute2 = Number(minute2);
  minute = Number(minute);
  rt = Number(rt);

  if (minute < minute2) return true;

  return false;
};

exports.fetchLeaderBoard = async (req, res) => {



  
  




  var leaderboard=[];
  var quiz = [];


  quiz = await QuizSubmission.find({}).exec();

  for(var i = 0;i<quiz.length;i++)
  {
    var obj = quiz[i];
    for(var j = 0;j<obj.answer.length;j++){
    
      var email = obj.answer[j].email;
      var score = obj.answer[j].score;
      const isPresent = leaderboard.some(item => item.email === email);
      if(isPresent){
        const obj = leaderboard.findIndex(item => item.email === email);
        leaderboard[obj].score += score;
      }else{
        leaderboard.push({email:email,score:score});
      }
    }
  }

  
  
  res.status(200).json(leaderboard);
};

exports.fetchLeaderBoardById = async (req, res) => {



  
  




  var leaderboard=[];
  var quiz = [];
  const {id} = req.body;


  quiz = await QuizSubmission.find({id}).exec();

  for(var i = 0;i<quiz.length;i++)
  {
    var obj = quiz[i];
    for(var j = 0;j<obj.answer.length;j++){
    
      var email = obj.answer[j].email;
      var score = obj.answer[j].score;
      const isPresent = leaderboard.some(item => item.email === email);
      if(isPresent){
        const obj = leaderboard.findIndex(item => item.email === email);
        leaderboard[obj].score += score;
      }else{
        leaderboard.push({email:email,score:score});
      }
    }
  }

  leaderboard.sort((a,b)=>{
    if(a.score > b.score) return -1;
    if(b.score > a.score) return 1;
    return 0;
 })

  
  
  res.status(200).json(leaderboard);
};
