import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import ReactLoading from "react-loading";

const check = (title, aa, rt) => {
  const date = new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata" });

  const a = aa;

  

  var year = date.substring(6, 10);
  var month = date.substring(3, 5);
  var dt = date.substring(0, 2);
  var hour = date.substring(12, 14);
  var minute = date.substring(15, 17);



  var year2 = a.substring(0, 4);
  var month2 = a.substring(5, 7);
  var dt2 = a.substring(8, 10);
  var hour2 = a.substring(11, 13);
  var minute2 = a.substring(14, 17);

  

  if (year2 < year) return true;
  if (year2 > year) return false;

  if (month2 < month) return true;
  if (month2 > month) return false;

  if (dt2 < dt) return true;
  if (dt2 > dt) return false;

  if (hour2 < hour) return true;
  if (hour2 > hour) return false;

  if (minute2 < minute) return true;
  return false;
};
function AdminCreateQuiz(props) {
  const [value, setValue] = useState(0);
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState();
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_URL;

  const handleClick = async (e) => {
    setFlag(true);
    e.preventDefault();

    if (value == 0 || time == 0) {
      alert("Select all options");
      setFlag(false);
      return;
    }

    if (startTime == null || check("", startTime, 2)) {
      alert("Quiz time must be in future");
      setFlag(false);
      return;
    }

    await axios
      .post(url + "/create-random-quiz", {
        number: value,
        time: time,
      })
      .then(function (res) {

        const x = JSON.stringify(res.data);
        
        localStorage.setItem("quiz", x);
        localStorage.setItem("time", startTime);
        localStorage.setItem("runTime", time);
        navigate("/admin/preview");
      });
  };

  return (
    <>
      <div className="flex mt-10 sm:mt-0">
        <div
          className={`bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 w-full h-vh min-h-screen overlflow-y-scroll p-5 ${
            props.open ? "sm:ml-72" : "sm:ml-16"
          } duration-200`}
        >
          {/* Heading */}
          <div className="flex justify-center w-full bg-blue-950 p-2 mb-3">
            <h1 className="text-xl font-bold text-white">Create Quiz</h1>
          </div>

          {flag && (
            <ReactLoading
              type="balls"
              color="#0000FF"
              height={100}
              width={50}
            />
          )}

          <div className="w-full rounded-xl border-2 border-gray-500 p-4">
            <form>
              {/* Selections area */}
              <div class="flex gap-5 flex-wrap">
                {/* Select Questions */}

                <div class="w-72">
                  <label
                    for="questions"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Select Questions
                  </label>
                  <select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    id="questions"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option selected>Select one</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                  </select>
                </div>

                {/* Select Duration */}
                <div class="w-72">
                  <label
                    for="time"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Duration
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    id="time"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option selected>Unlimited</option>
                    <option value="5">5 min</option>
                    <option value="10">10 min</option>
                    <option value="15">15 min</option>
                    <option value="25">25 min</option>
                    <option value="30">30 min</option>
                  </select>
                </div>

                {/* Date Time */}
                <div class="w-72">
                  <label
                    for="quizDate"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Date & Time:
                  </label>
                  <input
                    type="datetime-local"
                    onChange={(e) => {
                      setStartTime(e.target.value);
                    }}
                    value={startTime}
                    id="quizDate"
                    name="quizDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  ></input>
                </div>
              </div>

              {/* Button */}
              <div class="flex justify-center">
                <Button
                  buttonType="submit"
                  buttonLabel="Create Quiz"
                  buttonClassName="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center p-5 my-5"
                  onClick={handleClick}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCreateQuiz;
