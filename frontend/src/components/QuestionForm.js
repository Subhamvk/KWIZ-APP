import Button from "./Button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
function QuestionForm() {
  const [question, setQuestion] = useState("");
  const [op_a, setOp_a] = useState("");
  const [op_b, setOp_b] = useState("");
  const [op_c, setOp_c] = useState("");
  const [op_d, setOp_d] = useState("");
  const [ans, setAns] = useState("");
  const [exp, setExp] = useState("");

  const UploadQuestion = async (e) => {
    e.preventDefault();
    let items = { question, op_a, op_b, op_c, op_d, ans, exp };
    const url = process.env.REACT_APP_URL;

    const res = await fetch(url + "/upload-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        question: question,
        op_a: op_a,
        op_b: op_b,
        op_c: op_c,
        op_d: op_d,
        ans: ans,
        exp: exp,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      
      alert("Successsfully uploaded !!");
    }
    if (res.status === 403) {
      alert("Question Already Exist");
    }
  };

  // Reset
  function resetForm(e) {
    e.preventDefault();
    
    setQuestion("");
    setOp_a("");
    setOp_b("");
    setOp_c("");
    setOp_d("");
    setAns("");
    setExp("");
  }

  return (
    <>
      {/* Questions */}
      <div>
        <form>
          <div className="border-x-2 border-t-2 border-gray-500 bg-green-200 rounded-tl-xl rounded-tr-xl mt-3 sm:mx-3 p-3">
            {/* Question */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="question"
              >
                Question
              </label>

              <input
                defaultValue={""}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-3 h-28"
                id="question"
                name="question"
                placeholder="Type your question here"
                required
              ></input>
            </div>
          </div>
          {/* Options div */}
          <div className="border-x-2 border-b-2 border-gray-500 bg-lime-100 rounded-bl-xl rounded-br-xl mb-3 sm:mx-3 p-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="options"
            >
              Options
            </label>

            <div id="options">
              {/* Option A */}
              <div className="flex border-2 border-gray-700 rounded-lg mb-3 min-h-[20px]">
                {/* option label */}
                <div className="flex justify-center items-center w-[5%] border-r-2 border-gray-700">
                  A
                </div>
                {/* Option text */}
                <div className="flex w-[95%]">
                  <input
                    defaultValue={""}
                    value={op_a}
                    onChange={(e) => setOp_a(e.target.value)}
                    className="w-full p-3"
                    id="question"
                    name="question"
                    placeholder="Type option A here"
                  ></input>
                </div>
              </div>

              {/* Option B */}
              <div className="flex border-2 border-gray-700 rounded-lg mb-3 min-h-[20px]">
                {/* option label */}
                <div className="flex justify-center items-center w-[5%] border-r-2 border-gray-700">
                  B
                </div>
                {/* Option text */}
                <div className="flex w-[95%]">
                  <input
                    defaultValue={""}
                    value={op_b}
                    onChange={(e) => setOp_b(e.target.value)}
                    className="w-full p-3"
                    id="question"
                    name="question"
                    placeholder="Type option B here"
                  ></input>
                </div>
              </div>

              {/* Option C */}
              <div className="flex border-2 border-gray-700 rounded-lg mb-3 min-h-[20px]">
                {/* option label */}
                <div className="flex justify-center items-center w-[5%] border-r-2 border-gray-700">
                  C
                </div>
                {/* Option text */}
                <div className="flex w-[95%]">
                  <input
                    defaultValue={""}
                    value={op_c}
                    onChange={(e) => setOp_c(e.target.value)}
                    className="w-full p-3"
                    id="question"
                    name="question"
                    placeholder="Type option C here"
                  ></input>
                </div>
              </div>

              {/* Option D */}
              <div className="flex border-2 border-gray-700 rounded-lg mb-3 min-h-[20px]">
                {/* option label */}
                <div className="flex justify-center items-center w-[5%] border-r-2 border-gray-700">
                  D
                </div>
                {/* Option text */}
                <div className="flex w-[95%]">
                  <input
                    defaultValue={""}
                    value={op_d}
                    onChange={(e) => setOp_d(e.target.value)}
                    className="w-full p-3"
                    id="question"
                    name="question"
                    placeholder="Type option D here"
                  ></input>
                </div>
              </div>
            </div>

            {/* Correct Option */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="correctOption"
              >
                Correct Option
              </label>

              <select
                id="correctOption"
                value={ans}
                onChange={(e) => setAns(e.target.value)}
                defaultValue={"default"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="default">Select correct option</option>
                <option value="1">A</option>
                <option value="2">B</option>
                <option value="3">C</option>
                <option value="4">D</option>
              </select>
            </div>

            {/* Explaination */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="explaination"
              >
                Explaination
              </label>

              <textarea
                defaultValue={""}
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                className="w-full p-3 h-28"
                id="explaination"
                name="explaination"
                placeholder="Type your explaination here"
              ></textarea>
            </div>

            <div className="mt-3 flex justify-center gap-5 w-full h-10">
              <Button
                onClick={UploadQuestion}
                buttonType="submit"
                buttonClassName="min-w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center"
                buttonLabel="Save"
              ></Button>

              <Button
                onClick={resetForm}
                buttonClassName="min-w-[100px] text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm py-2.5 text-center"
                buttonLabel="Reset"
              ></Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default QuestionForm;
