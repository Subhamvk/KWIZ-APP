import StudentQuestionArea from "../components/StudentQuestionArea";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

function StudentQuiz() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(true);
  const url = process.env.REACT_APP_URL;
  var score = 0;

  let navigate = useNavigate();
  const state = useSelector((state) => ({ ...state }));

  const email = state.user.email;
  var result = { email: email, answer: [] };

  useEffect(() => {
    axios
      .post(url + "/get-quiz", { id: id })
      .then(function (res) {
        setData(res.data);
        setFlag(false);
        return () => {};
      })
      .catch(function (err) {
        
        alert(err.response.data.message);
        navigate("/dashboard");
      });
  }, []);

  const callBack = (message) => {
    

    const found = result.answer.some((el) => el.q == message.q);
    if (found) {
      const index = result.answer.findIndex((el) => el.q == message.q);
      result.answer[index].op = message.op;
    } else {
      result.answer.push(message);
    }
    
  };

  const handleSubmit = (e) => {
    setFlag(true);
    e.preventDefault();

    var score = 0;

    for (var i = 0; i < result.answer.length; i++) {
      if (result.answer[i].ans == result.answer[i].op) score++;
    }
    result["score"] = score;

    axios
      .post(url + "/get-submission", { result, id: id })
      .then(function (res) {
        
        alert("Submitted Successfully");
        setFlag(false);
        navigate("/dashboard");
      })
      .catch(function (err) {
        
        alert("Already Submitted or Some internal failure");
        navigate("/dashboard");
      });
  };

  

  return (
    <>
      {/* Wrapper div */}
      <div class="flex justify-center w-full h-screen">
        {/* Info area for mobile devices */}
        <div className="sm:hidden flex flex-col absolute top-0 h-[6rem] bg-yellow-300 w-screen p-2 text-sm">
          <div>
            User: <span>{email}</span>
          </div>
          <div>
            <div>
              Start Time:{" "}
              <span>{new Date(data.startTime).toLocaleString()}</span>
            </div>
            <div>
              Run Time: <span>{data.runTime + " Minute"}</span>
            </div>
          </div>

          <div>
            Total Questions:{" "}
            <span>{data && data.questions ? data.questions.length : "0"}</span>
          </div>
        </div>

        {/* left info area */}
        <div class=" hidden md:fixed md:top=0 md:left-0 w-[17rem] md:h-screen md:flex flex-col md:items-center bg-gradient-to-r from-teal-400 to-green-200 md:border-r-2 md:border-gray-400">
          <div className="hidden md:flex md:w-full md:h-auto md:bg-emerald-700 p-2">
            <p class="w-full break-words">{email}</p>
          </div>

          {/* Timer Area */}
          <div className="hidden md:flex md:w-full md:h-auto md:bg-blue-400 p-2">
            <p class="w-full">
              Start Time:{" "}
              <sapn>{new Date(data.startTime).toLocaleString()}</sapn>
            </p>
          </div>

          <div className="hidden md:flex md:w-full md:h-auto md:bg-blue-300 p-2">
            <p class="w-full">
              Run Time: <sapn>{data.runTime + " Minute"}</sapn>
            </p>
          </div>

          <div className="hidden md:flex md:w-full md:h-auto md:bg-blue-400 p-2">
            <p class="w-full">
              Total Questions:{" "}
              <span>
                {data && data.questions ? data.questions.length : "0"}
              </span>
            </p>
          </div>
        </div>

        {/* Quiz area */}
        <div class="md:ml-[17rem] md:w-full h-fit min-h-screen overlflow-y-scroll bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 p-3 mt-[6rem] sm:mt-0">
          {data &&
            data.questions &&
            data.questions.map((res, num) => {
              return (
                <StudentQuestionArea
                  id={res}
                  number={num}
                  handleCallBack={callBack}
                ></StudentQuestionArea>
              );
            })}

          {flag && (
            <ReactLoading
              type="balls"
              color="#0000FF"
              height={100}
              width={50}
            />
          )}

          <div class="flex justify-center items-center my-10 mx-3 h-10">
            <button
              type="submit"
              onClick={handleSubmit}
              class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm min-w-[6rem] max-w-[8rem] w-1/6 px-5 py-2.5 m-3 my-5 text-center"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentQuiz;
