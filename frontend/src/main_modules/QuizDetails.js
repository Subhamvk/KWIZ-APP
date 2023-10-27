import StudentQuestionArea from "../components/StudentQuestionArea";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosEye } from "react-icons/io";

import ReactLoading from "react-loading";

function QuizDetails(props) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const url = process.env.REACT_APP_URL;
  var score = 0;


  let navigate = useNavigate();
  const state = useSelector((state) => ({ ...state }));

  const email = state.user.email;
  var result = { email: email, answer: [] };
  const [flag, setFlag] = useState(true);

  const startTime = localStorage.getItem("quiz-history-start");
  const title = localStorage.getItem("quiz-history-title");
  const runTime = localStorage.getItem("quiz-runtime");
  const questions = localStorage.getItem("quiz-questions");

  useEffect(() => {
    axios
      .post(url + "/get-leaderboard-by-id", { id: id })
      .then(function (res) {
        
       setData(res.data);
       var obj = [...this.state.data];
       obj.sort((a,b) => !(a.score - b.score));

       setData(obj);

        return () => {};
      })
      .catch(function (err) {
        alert(err.response.data.message);
        // navigate("/dashboard");
      });
    setFlag(false);
  }, []);

  

  const handleDownload = (id, title) => {
    axios
      .post(url + "/get-quiz-by-id", { id })
      .then(function (res) {
        localStorage.setItem("preview", JSON.stringify(res.data));
        navigate("/preview-quiz");
        return () => {};
      })
      .catch(function (err) {
        alert(err.response.data.message);
      });
  };

  return (
    <>
      <div className="flex mt-10 sm:mt-0">
        <div
          className={`bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 w-full h-vh min-h-screen overlflow-y-scroll p-5 duration-200`}
        >
          {/* Heading */}
          <div className="flex justify-center w-full bg-blue-950 p-2 mb-3">
            <h1 className="text-xl font-bold text-white">Rankings</h1>
          </div>

          {flag && (
            <ReactLoading
              type="balls"
              color="#0000FF"
              height={100}
              width={50}
            />
          )}

          {/* View Questions Wrapper */}
          <div className="w-full mb-4">
            <button
              onClick={(e) => handleDownload(id, title)}
              className="rounded-md border-2 border-gray-700 p-2 bg-green-500 hover:bg-green-600 hover:border-blue-700"
            >
              <IoIosEye className="inline text-[2rem] mr-2" />
              <span>View Questions</span>
            </button>
          </div>
          {/* Quiz details wrapper */}
          <div className="flex justify-center w-full">
            {/* Details div */}
            <div className="border-2 border-gray-600 h-fit rounded-xl p-2">
              <div className="w-full flex justify-center border-b-2 border-emerald-600">
                <p className="text-xl font-bold">Quiz Details</p>
              </div>
              <div className="flex justify-center">
                <table className="table-fixed">
                  <tr>
                    <td className="text-right p-2">Title:</td>
                    <td className="text-left p-2">{title}</td>
                  </tr>
                  <tr>
                    <td className="text-right p-2">Start Time:</td>
                    <td className="text-left p-2">{startTime}</td>
                  </tr>

                  <tr>
                    <td className="text-right p-2">Run Time:</td>
                    <td className="text-left p-2">{runTime + " Minute"}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <div className="w-full my-3">
            {/* Leaderboard heading div */}
            <div className="flex justify-center">
              <div className="text-center text-2xl text-purple-950 font-extrabold border-2 bg-yellow-400 border-gray-700 rounded-2xl min-w-fit w-[50%] p-3">
                <h1>LEADERBOARD</h1>
              </div>
            </div>

            {/* Leaderboard div */}
            <div className="flex justify-center w-full bg-gradient-to-r from-cyan-400 to-blue-300 border-2 border-gray-700 rounded-2xl shadow-slate-800 shadow-xl p-3">
              {/* Ranking part */}
              <div className="w-full sm:w-[90%] md:w-[70%] flex flex-col">
                {/* Single rank + name tab */}
                {data.length === 0 ? (
                  // <div className="w-full flex justify-center h-screen">
                  <div className="flex justify-center w-full h-fit opacity-20 text-2xl font-bold my-10">
                    <span>Leaderboard Unavailable</span>
                  </div>
                ) : (
                  // </div>
                  ""
                )}
                {data &&
                  data.map((e, id) => {
                    return (
                      <div className="flex items-center bg-gradient-to-r from-green-300 to-emerald-500 shadow-slate-800 shadow-xl border-2 border-gray-700 rounded-3xl p-1 my-2 sm:m-2">
                        {/* Ranking position */}
                        <div>
                          <div className="flex justify-center rounded-full items-center bg-blue-700 w-11 min-w-fit h-11 min-h-fit mx-1 my-0 sm:m-2 p-2">
                            <p className="text-white text-xl font-bold">
                              {id + 1}
                            </p>
                          </div>
                        </div>

                        {/* Name Section */}
                        <div className="flex justify-start items-center w-[50%] sm:w-[60%] md:w-[40%] mx-1 my-0 sm:m-2">
                          <p className="text-sm sm:text-lg w-full break-words">
                            {e.email}
                          </p>
                        </div>
                        {/* Score section */}

                        <div className="flex justify-end items-center w-[50%] sm:w-[40%] md:w-[60%] mx-1 my-0 sm:m-2 md:mr-7 lg:mr-10">
                          <div>
                            <p className="text-sm sm:text-lg font-bold text-red-700 w-fit break-words">
                              {"Score : " + e.score}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Wrapper div */}
      {/* <div class="flex justify-center w-full h-screen"> */}
      {/* left info area */}
      {/* <div class=" hidden md:fixed md:top=0 md:left-0 w-[17rem] md:h-screen md:flex flex-col md:items-center md:bg-gray-200 md:border-r-2 md:border-gray-400">
          <div className="hidden md:flex md:w-full md:h-auto md:bg-emerald-700 p-2">
            <p class="w-full">{title}</p>
          </div> */}

      {/* Timer Area */}
      {/* <div className="hidden md:flex md:w-full md:h-auto md:bg-blue-200 p-2">
            <p class="w-full">
              Start Time:{" "}
              <sapn>{startTime}</sapn>
            </p>
          </div> */}

      {/* <div className="hidden md:flex md:w-full md:h-auto md:bg-blue-200 p-2">
            <p class="w-full">
              Run Time: <sapn>{runTime + " Minute"}</sapn>
            </p>
          </div> */}

      {/* {flag &&  <ReactLoading type="balls" color="#0000FF" 
        height={100} width={50} />}

        </div> */}

      {/* Quiz area */}

      {/* <div class="md:ml-[17rem] md:w-full h-fit min-h-screen overlflow-y-scroll bg-gray-100 p-3">
          <div className="w-full bg-red-200 p-2">
            <h1 className="text-xl font-bold text-gray-800">Rankings</h1>
          </div>

          <div className="w-full my-3 shadow-slate-800">
            <fieldset className="flex justify-center bg-gradient-to-r from-cyan-400 to-blue-300 border-2 border-gray-700 rounded-2xl shadow-slate-800 shadow-xl p-3">
              <legend className="text-center text-2xl text-purple-950 font-extrabold border-2 bg-yellow-400 border-gray-700 rounded-2xl p-3">
                <h1>LEADERBOARD</h1>
              </legend> */}
      {/* Ranking part */}

      {/* <div className="w-[90%] sm:w-[70%] flex flex-col"> */}
      {/* Single rank + name tab */}
      {/* {data &&
                  data.map((e, id) => {
                    return (
                      <div className="flex items-center bg-gradient-to-r from-green-300 to-emerald-500 shadow-slate-800 shadow-xl border-2 border-gray-700 rounded-3xl p-1 m-2"> */}
      {/* Ranking position */}
      {/* <div className="flex justify-center rounded-full items-center bg-blue-700 w-11 min-w-fit h-10 min-h-fit m-2 p-2">
                          <p className="text-white text-xl font-bold">
                            {id + 1}
                          </p>
                        </div> */}
      {/* Name Section */}
      {/* <div className="flex justify-start items-center w-full m-2">
                          <p className="text-lg">{e.email}</p>
                        </div>
                        <div className="flex justify-start items-center w-full m-2">
                          <p className="text-lg">{"Score : " + e.score}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </fieldset>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default QuizDetails;
