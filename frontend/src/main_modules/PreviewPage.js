import axios from "axios";
import { useState } from "react";
import Button from "../components/Button";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
function PreviewPage(props) {
  const navigate = useNavigate();
  const data = localStorage.getItem("quiz");
  const startTime = localStorage.getItem("time");
  const runTime = localStorage.getItem("runTime");
  const [title, setTitle] = useState("");
  const [flag, setFlag] = useState(false);
  var Qdata = JSON.parse(data);
  

  const handleClick = async (e) => {
    setFlag(true);

    if (title.length == 0) {
      setFlag(false);
      alert("Please Enter Title");
      return;
    }

    e.preventDefault();
    const url = process.env.REACT_APP_URL;

    var l = JSON.parse(data);
    var questions = [];

    for (var i = 0; i < l.length; i++) {
      questions.push(l[i]._id.toString());
    }

    

    await axios
      .post(url + "/save-quiz", {
        questions,
        startTime,
        runTime,
        title,
      })
      .then(function (res) {
        localStorage.removeItem("quiz");
        localStorage.removeItem("time");
        localStorage.removeItem("runTime");
        alert("saved");
        navigate("/admin");
        setFlag(false);
      })
      .catch(function (err) {
        alert(err.response.data);
        setFlag(false);
        return;
      });
  };

  return (
    <>
      <div className="flex mt-10 sm:mt-0">
        <div
          className={`bg-gray-100 w-full h-vh min-h-screen overlflow-y-scroll p-3 sm:p-5 ${
            props.open ? "sm:ml-72" : "sm:ml-16"
          } duration-200`}
        >
          {/* Heading */}
          <div className="w-full bg-red-200 p-2 mb-3">
            <h1 className="text-xl font-bold text-gray-800">Preview</h1>
          </div>
          {flag && (
            <ReactLoading
              type="balls"
              color="#0000FF"
              height={100}
              width={50}
            />
          )}

          {Qdata &&
            Qdata.map((post, index) => {
              const { question, op_a, op_b, op_c, op_d, ans, exp } = post;
              return (
                <>
                  <div class="mb-12">
                    {/* Questions Div */}
                    <div className="flex flex-col justify-center items-center bg-green-200 border-x-2 border-t-2 border-gray-500 rounded-tl-xl rounded-tr-xl sm:mx-3 px-3 sm:px-7 py-4">
                      <div className="text-lg font-bold leading-loose rounded-md px-4">
                        <p>Question {index + 1}</p>
                      </div>

                      <p>{question}</p>
                    </div>
                    {/* options div */}
                    <div className="bg-lime-100 border-x-2 border-gray-500 sm:mx-3 px-3 py-3 sm:p-7">
                      {/* Option A */}
                      <div className="flex items-center pl-4 border-2 border-gray-700 rounded-lg mb-3">
                        <div className="flex">
                          <div className="flex justify-center items-center border-r-2 border-gray-700 w-[40px] p-3">
                            <span className="font-bold">A</span>
                          </div>
                          <div className="m-3 w-full">{op_a}</div>
                        </div>
                      </div>

                      {/* Option B */}
                      <div className="flex items-center pl-4 border-2 border-gray-700 rounded-lg mb-3">
                        <div className="flex">
                          <div className="flex justify-center items-center border-r-2 border-gray-700 w-[40px] p-3">
                            <span className="font-bold">B</span>
                          </div>
                          <div className="m-3 w-full">{op_b}</div>
                        </div>
                      </div>

                      {/* Option C */}
                      <div className="flex items-center pl-4 border-2 border-gray-700 rounded-lg mb-3">
                        <div className="flex">
                          <div className="flex justify-center items-center border-r-2 border-gray-700 w-[40px] p-3">
                            <span className="font-bold">C</span>
                          </div>
                          <div className="m-3 w-full">{op_c}</div>
                        </div>
                      </div>

                      {/* Option D */}
                      <div className="flex items-center pl-4 border-2 border-gray-700 rounded-lg mb-3">
                        <div className="flex">
                          <div className="flex justify-center items-center border-r-2 border-gray-700 w-[40px] p-3">
                            <span className="font-bold">D</span>
                          </div>
                          <div className="m-3 w-full">{op_d}</div>
                        </div>
                      </div>
                    </div>

                    {/* Correct ans & Explaination */}
                    <div className="flex flex-col justify-center items-center bg-amber-50 border-x-2 border-b-2 border-gray-500 rounded-bl-xl rounded-br-xl sm:mx-3 mb-3 px-3 sm:px-7 py-4">
                      {/* Correct Ans */}
                      <div className="flex justify-center w-full h-16 m-2">
                        <div className="shadow-lg shadow-slate-600 border-2 border-slate-600 border-dashed flex items-center pl-4 rounded-lg min-w-[200px] w-2/6 h-16">
                          <div className="flex justify-end  w-3/6 pr-3 font-bold">
                            <span>Correct Ans :</span>
                          </div>
                          <div className="flex justify-start w-3/6 pl-1 font-bold">
                            <span className="pl-2">{ans}</span>
                          </div>
                        </div>
                      </div>

                      {/* Explaination */}

                      <div className="shadow-lg shadow-slate-600 border-2 border-slate-600 border-dashed flex flex-col items-start p-3 rounded-lg w-full h-auto m-2">
                        <div className="m-1">
                          <span className="font-bold">Explaination :</span>
                        </div>
                        <div className="m-1">
                          <span className="p-2">{exp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

          <div className="w-full">
            <label for="title" class="block m-2 text-slate-700 font-bold">
              Quiz Title{" "}
              <span className="text-red-500 text-[0.7rem]">(*required)</span>
            </label>
            <input
              type="text"
              id="title"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Type quiz title here"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <Button
              buttonType="submit"
              buttonLabel="Save"
              buttonClassName="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center p-5 my-3"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>

      {/* <div className="flex"></div>
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleClick}>Save</button> */}
    </>
  );
}

export default PreviewPage;
