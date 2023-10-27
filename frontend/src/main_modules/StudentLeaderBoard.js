import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ReactLoading from "react-loading";

function StudentLeaderBoard(props) {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(true);
  const url = process.env.REACT_APP_URL;
  useEffect(() => {
    axios
      .post(url + "/get-leaderboard", {})
      .then(function (res) {
        res.data.sort((a, b) => (Number(a.score) < Number(b.score) ? 1 : -1));
       
        setData(res.data);
        setFlag(false);

        return () => {};
      })
      .catch(function (err) {
        alert(err.response.data.message);
        setFlag(false);
      });
  }, []);

  return (
    <>
      <div className="flex mt-10 sm:mt-0">
        <div
          className={`bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 w-screen h-vh min-h-screen overlflow-y-scroll p-5 ${
            props.open ? "sm:ml-72" : "sm:ml-16"
          } duration-200`}
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
                  <div className="w-full flex justify-center">
                    <div className="w-fit h-fit opacity-20 text-2xl font-bold my-10">
                      <span>Leaderboard Unavailable</span>
                    </div>
                  </div>
                ) : (
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
    </>
  );
}

export default StudentLeaderBoard;
