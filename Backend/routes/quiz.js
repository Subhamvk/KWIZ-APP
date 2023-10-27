const express = require("express");
const router = express.Router();
const { authCheck, profileCheck,loginCheck,tokenVerifier } = require("../middlewares/auth");
const {
fetchLeaderBoard,fetchLeaderBoardById
} = require("../controller/quiz");



//Route to Fetch LeaderBoard
router.post("/get-leaderboard",fetchLeaderBoard);


router.post("/get-leaderboard-by-id",fetchLeaderBoardById);





module.exports = router;
