import { useEffect, useState } from "react";
import { ClipboardEvent } from "react";
import axios from "axios";

function StudentQuestionArea(props) {
  const [data, setData] = useState([]);
  const url = process.env.REACT_APP_URL;


  useEffect(() => {
    axios
      .post(url + "/get-question-by-id", { id: props.id })
      .then(function (res) {
        setData(res.data[0]);
      })
      .catch(function (err) {
        
      });
  }, []);

  const handleClick = (e) => {
    props.handleCallBack({ q: data._id, op: e.target.value, ans: data.ans });
  };

  return (
    <>
      <div>
        {/* Copying prevented */}
        <div
          class="flex flex-col"
          onCopy={(e) => {
            e.preventDefault();
            alert("Copying not allowed");
          }}
        >
          <div class="flex flex-col justify-center items-center border-x-2 border-t-2 border-gray-500 bg-green-200 rounded-tl-xl rounded-tr-xl mt-3 sm:mx-3 p-3">
            <div class="flex justify-center text-lg font-bold leading-loose  bg-gradient-to-r from-green-200 via-indigo-500 to-green-200 min-w-[8rem] max-w-[20rem] w-[60%] px-4">
              <p>Question</p>
              <span className="mx-2">{props.number + 1}</span>
            </div>

            <p>{data.question}</p>
          </div>

          {/* options div */}
          <div class="bg-lime-100 border-x-2 border-b-2 border-gray-500 rounded-bl-xl rounded-br-xl mb-3 sm:mx-3 p-3">
            {/* radio buttons */}
            <div>
              {/* Option a */}
              <div class="flex items-center pl-4 border-2 border-gray-700 rounded-lg hover:border-green-700 hover:bg-green-100 mb-3">
                <input
                  id={data.op_a + data._id}
                  type="radio"
                  value="1"
                  onClick={handleClick}
                  name={props.id}
                  class="w-7 h-7 bg-blue-700 text-red-600  border-gray-300 accent-red-500"
                />
                <label
                  onClick={handleClick}
                  htmlFor={data.op_a + data._id}
                  class=" w-full py-4 ml-2 text-sm font-medium text-gray-900 p-2"
                >
                  {data.op_a}
                </label>
              </div>

              {/* Option b */}
              <div class="flex items-center pl-4 border-2 border-gray-700 rounded-lg hover:border-green-700 hover:bg-green-100 mb-3">
                <input
                  id={data.op_b + data._id}
                  type="radio"
                  value="2"
                  onClick={handleClick}
                  name={props.id}
                  class="w-7 h-7 text-red-600 bg-gray-100 border-gray-300 accent-red-500"
                />
                <label
                  onClick={handleClick}
                  htmlFor={data.op_b + data._id}
                  class="w-full py-4 ml-2 text-sm font-medium text-gray-900 p-2"
                >
                  {data.op_b}
                </label>
              </div>

              {/* Option c */}
              <div class="flex items-center pl-4 border-2 border-gray-700 rounded-lg hover:border-green-700 hover:bg-green-100 mb-3">
                <input
                  id={data.op_c + data._id}
                  type="radio"
                  value="3"
                  name={props.id}
                  onClick={handleClick}
                  class="w-7 h-7 text-red-600 bg-gray-100 border-gray-300 accent-red-500"
                />
                <label
                  onClick={handleClick}
                  htmlFor={data.op_c + data._id}
                  class="w-full py-4 ml-2 text-sm font-medium text-gray-900 p-2"
                >
                  {data.op_c}
                </label>
              </div>

              {/* Option d */}
              <div class="flex items-center pl-4 border-2 border-gray-700 rounded-lg hover:border-green-700 hover:bg-green-100 mb-3">
                <input
                  id={data.op_d + data._id}
                  type="radio"
                  value="4"
                  name={props.id}
                  onClick={handleClick}
                  class="w-7 h-7 text-red-600 bg-gray-100 border-gray-300 accent-red-500"
                />
                <label
                  onClick={handleClick}
                  htmlFor={data.op_d + data._id}
                  class="w-full py-4 ml-2 text-sm font-medium text-gray-900 p-2"
                >
                  {data.op_d}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentQuestionArea;
