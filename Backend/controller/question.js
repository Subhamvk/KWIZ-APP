const Question = require("../models/question");
const Quiz = require("../models/quiz");
const QuizSubmission = require("../models/quizsubmission");
var mongoose = require("mongoose");
const check = (title, aa, rt) => {

  const date = new Date().toLocaleString("en-GB", { timeZone: 'Asia/Kolkata' });




  const a = aa;

  console.log(date, a);

  var year = date.substring(6, 10);
  var month = date.substring(3, 5);
  var dt = date.substring(0, 2);
  var hour = date.substring(12, 14);
  var minute = date.substring(15, 17);

  console.log(year, month, dt, hour, minute);

  var year2 = a.substring(0, 4);
  var month2 = a.substring(5, 7);
  var dt2 = a.substring(8, 10);
  var hour2 = a.substring(11, 13);
  var minute2 = a.substring(14, 17);

  console.log(year2, month2, dt2, hour2, minute2);

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
      console.log(minute2, minute);

      if (minute2 > minute) return true;
      console.log(minute2, rt, minute);
      if (minute2 + rt >= minute) return true;
    }
  }

  return false;
};
const check2 = (title, aa, rt) => {
  const date = new Date().toLocaleString("en-GB", { timeZone: 'Asia/Kolkata' });
  const a = aa;

  console.log(title, date, a);

  var year = date.substring(6, 10);
  var month = date.substring(3, 5);
  var dt = date.substring(0, 2);
  var hour = date.substring(12, 14);
  var minute = date.substring(15, 17);

  console.log(year, month, dt, hour, minute);

  var year2 = a.substring(0, 4);
  var month2 = a.substring(5, 7);
  var dt2 = a.substring(8, 10);
  var hour2 = a.substring(11, 13);
  var minute2 = a.substring(14, 17);

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

exports.insertQuestion = (req, res) => {
  const { question, op_a, op_b, op_c, op_d, ans, exp } = req.headers;

  if (
    question == null ||
    op_a == null ||
    op_b == null ||
    op_c == null ||
    op_d == null ||
    ans == null
  ) {
    res.status(400).json({ Error: "All field must be filled" });
  } else {
    Question.countDocuments({ question }, function (err, count) {
      console.log(question, op_a, op_b, op_c, op_d, ans, exp);
      if (count > 0) {
        res.status(403).json({ Error: "Question Already Exist" });
      } else {
        const questions = new Question({
          question,
          op_a,
          op_b,
          op_c,
          op_d,
          ans,
          exp,
        });
        questions.save(function (err, result) {
          console.log(result);
          res.status(200).json({ id: result._id });
        });
      }
    });
  }
};

exports.fetchQuestion = (req, res) => {
  const { question, op_a, op_b, op_c, op_d, ans, exp } = req.headers;

  Question.find({}, function (err, result) {
    console.log(result);
    res.status(200).json(result);
  });
};

exports.fetchQuestionById = (req, res) => {
  const id = req.body.id;

  Question.find({ _id: mongoose.Types.ObjectId(id) }, function (err, result) {
    console.log(result);
    res.status(200).json(result);
  });
};

exports.randomQuizCreation = async (req, res) => {
  const { number, time } = req.body;
  console.log(number);

  //const number = 1;

  try {
    const result = await Question.aggregate([
      { $sample: { size: Number(number) } },
    ]).exec();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.insertQuiz = async (req, res) => {
  console.log(req.body);
  const { title, startTime, runTime, questions } = req.body;



  try {
    Quiz.countDocuments({ title }, function (err, count) {
      if (count == 0) {
        const quiz = new Quiz({ title, startTime, runTime, questions });
        quiz.save(function (err, ress) {
          res.status(200).json("Saved");
        });
      } else {
        res.status(400).json("Title Already Exist, Use another Name");
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json("ALready exists");
  }
};

exports.getAllQuiz = async (req, res) => {
  try {
    Quiz.find({}, function (err, count) {
      try {
        const x = count.map((obj) => {
          obj.flag = "ff";
          return obj;
        });
        res.status(200).json(x);
      } catch (err) {
        console.log(x);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json("ALready exists");
  }
};

exports.getSubmission = async (req, res) => {

  const email = req.body.result.email;
  const answer = req.body.result;
  const quiz = req.body.id;
  console.log(req.body);
  console.log(email);
  console.log(answer);
  console.log(quiz);


  try {
    QuizSubmission.count({ id: quiz }, function (err, count) {
      if (count == 0) {
        console.log(count);
        const quizsubmission = new QuizSubmission({
          id: quiz,
          answer: answer,
          title: quiz,
        });
        quizsubmission.save(function (err, result) {
          if (err) {
            res.status(400).json(err);
            console.log(err);
          } else {
            res.status(200).json({ message: "Saved" });
          }

        });
      } else {
        try {
          QuizSubmission.count(
            { $and: [{ id: quiz }, { "answer.email": email }] },
            function (err, count) {
              if (count != 0) {
                console.log("Count ", count);
                res.status(400).json("Already submitted");
              } else {
                QuizSubmission.updateOne(
                  { id: quiz },
                  { $push: { answer: answer } },
                  function (err, res) {
                    console.log("Res", res);
                  }
                );
                res.status(200).json("Submitted");
              }
            }
          );
        } catch (err) {
          console.log(err);
          res.status(400).json("ALready exists");
        }
      }
    });
  } catch (err) { }
};

exports.getQuiz = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    Quiz.find({ _id: mongoose.Types.ObjectId(id) }, function (err, count) {
      if (count == null) {
        res.status(400).json({ message: "Quiz Not Found" });
      }

      console.log(count);
      const startTime = count[0].startTime;
      const runTime = count[0].runTime;
      if (check(count[0].title, startTime, runTime) == false) {
        res.status(400).json({ message: "Quiz completed" });
      } else if (check2(count.title, startTime, runTime)) {
        res.status(400).json({ message: "Quiz will start Soon" });
      } else {
        res.status(200).json(count[0]);
      }
    });
  } catch (err) {
    console.log(err);
  }
};


exports.getQuizById = async (req, res) => {
  const id = req.body.id;
  var data = {question:[]};
  try {
    const count = await Quiz.find({ _id: id }).exec();
      
        data.startTime = count[0].startTime;
        data.runTime = count[0].runTime;
        data.title = count[0].title;

        for (var i = 0; i < count[0].questions.length; i++) {
          console.log(count[0].questions[i]);
          const result = await  Question.find({ _id: mongoose.Types.ObjectId(count[0].questions[i]) }).exec();
          data.question.push(result[0]);
           
        }

        res.status(200).json(data);
      
  } catch (err) {
    console.log(err);
    res.status(400).json("Not Found");
  }

};
