import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./main_modules/LoginPage";
import SignupPage from "./main_modules/SignupPage";
import AdminQuestions from "./main_modules/AdminQuestions";
import AdminCreateQuestions from "./main_modules/AdminCreateQuestions";
import AdminCreateQuiz from "./main_modules/AdminCreateQuiz";
import AdminHistory from "./main_modules/AdminHistory";
import SideNav from "./components/SideNav";
import PreviewPage from "./main_modules/PreviewPage";
import PreviewPage2 from "./main_modules/PreviewPage2";
import StudentSideNav from "./components/StudentSideNav";
import StudentAttemptQuiz from "./main_modules/StudentAttemptQuiz";
import StudentQuiz from "./main_modules/StudentQuiz";
import { useDispatch } from "react-redux";
import QuizDetails from "./main_modules/QuizDetails";
import ForgotPassword from "./main_modules/ForgotPassword";
import AdminProfile from "./main_modules/AdminProfile";
import StudentProfile from "./main_modules/StudentProfile";
import StudentLeaderBoard from "./main_modules/StudentLeaderBoard";
import QuizHistoryStudent from "./main_modules/QuizHistoryStudent";

function App() {
  const [open, setOpen] = useState(true);
  console.log("Refreshed");
  let dispatch = useDispatch();
  const payload = JSON.parse(localStorage.getItem("user"));

  console.log(payload);

  dispatch({
    type: "LOGGED_IN_USER",
    payload,
  });

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/profile" element={<AdminProfile />} />
      <Route path="preview-quiz" element={<PreviewPage2 />} />
      {/* <Route path="/preview" element={<PreviewPage />} /> */}
      {/* Admin */}
      <Route
        path="/admin"
        element={<SideNav open={open} onOpen={() => setOpen(!open)} />}
      >
        <Route path="questions" element={<AdminQuestions open={open} />} />
        <Route
          path="create_questions"
          element={<AdminCreateQuestions open={open} />}
        />
        <Route path="create_quiz" element={<AdminCreateQuiz open={open} />} />
        <Route path="history" element={<AdminHistory open={open} />}></Route>

        <Route path="preview" element={<PreviewPage open={open} />} />
      </Route>

      <Route path="quiz-detail/:id" element={<QuizDetails open={open} />} />
      {/* Student */}
      <Route
        path="/dashboard"
        element={<StudentSideNav open={open} onOpen={() => setOpen(!open)} />}
      >
        {console.log(payload)}
        <Route
          path="attempt_quiz"
          element={<StudentAttemptQuiz open={open} />}
        />

        <Route
          path="leaderboard"
          element={<StudentLeaderBoard open={open} />}
        />
        <Route
          path="quiz-history"
          element={<QuizHistoryStudent open={open} />}
        />

        {/* Component pending */}
        <Route
          path="quizzes_missed"
          element={<AdminCreateQuiz open={open} />}
        />
        {/* Component Pending */}
        <Route path="history" element={<AdminHistory open={open} />} />
      </Route>

      <Route path="/quiz/:id" element={<StudentQuiz />}></Route>
      {/* <Route
        path="quiz-detail/:id"
        element={<QuizDetails open={open} />}
      ></Route> */}

      <Route path="/student_profile" element={<StudentProfile />}></Route>
    </Routes>
  );
}

export default App;
