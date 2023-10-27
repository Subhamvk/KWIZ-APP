import JsPDF from "jspdf";
function PreviewPage2(props) {
  const data = JSON.parse(localStorage.getItem("preview"));
  const Qdata = data.question;
  

  const generatePdf = () => {
    try {
      const report = new JsPDF("landscape", "pt", [795.28, 1241.89]);

      report.html(document.querySelector("#report"), {}).then(() => {
        report.save(data.title);
      });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <>
      <div className="flex" >
        <div
          className={`bg-gray-100 w-full h-vh min-h-screen overlflow-y-scroll p-5 ${
            props.open ? "ml-72" : "ml-16"
          } duration-200`}
        >
          {/* Heading */}
          <div className="w-full bg-red-200 p-2 mb-3">
            <h1 className="text-xl font-bold text-gray-800">Preview</h1>
          </div>
          <div className="w-full">
            <label for="title" class="block m-2 text-slate-700 font-bold">
              Quiz Title = {data.title}
            </label>
          </div>
          <div className="mb-2">
          <button
            onClick={generatePdf}
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <svg
              class="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <label for="title">Download As Pdf</label>
          </button>
          </div>
          

          <div id ="report">
          {Qdata &&
            Qdata.map((post, index) => {
              const { question, op_a, op_b, op_c, op_d, ans, exp } = post;
              return (
                <>
                  <div class="mb-12">
                    {/* Questions Div */}
                    <div className="flex flex-col justify-center items-center bg-green-200 border-x-2 border-t-2 border-gray-500 rounded-tl-xl rounded-tr-xl mx-3 px-7 py-4">
                      <div className="text-lg font-bold leading-loose rounded-md px-4">
                        <p>Question {index + 1}</p>
                      </div>

                      <p>{question}</p>
                    </div>
                    {/* options div */}
                    <div className="bg-lime-100 border-x-2 border-gray-500  mr-3 ml-3 p-7">
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
                    <div className="flex flex-col justify-center items-center bg-amber-50 border-x-2 border-b-2 border-gray-500 rounded-bl-xl rounded-br-xl mb-3 mr-3 ml-3 px-7 py-4">
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
            </div>
        </div>
      </div>

      {/* <div className="flex"></div>
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleClick}>Save</button> */}
    </>
  );
}

export default PreviewPage2;
