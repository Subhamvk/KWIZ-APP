import QuestionArea from "./QuestionArea";
import { useEffect, useState } from "react";
import axios from "axios";

import ReactLoading from "react-loading";
function QuestionsSection() {
  const [myData, setMyData] = useState([]);
  const [flag,setFlag] = useState(true);
  const url = process.env.REACT_APP_URL;

  useEffect(() => {


    var curl = url + "/get-questions";
    var ff = false;
    axios
      .post(url + "/get-questions", {})
      .then((res) => {setMyData(res.data)
       ff = true;
      }
       
      );
      setFlag(false);

      if('caches' in window){
        caches.match(curl).then(function(response){
          console.log("Cache  waala",response);
          return response.json();
        }
        )}

  }, []);



  return (
    <>

{flag &&  <ReactLoading type="balls" color="#0000FF" 
        height={100} width={50} />}

      {/* Question box */}
      {myData.map((post, index) => {
        const { question, op_a, op_b, op_c, op_d, ans, exp } = post;
        return (
          <QuestionArea
            key={index}
            index={index + 1}
            question={question}
            op_a={op_a}
            op_b={op_b}
            op_c={op_c}
            op_d={op_d}
            ans={ans}
            exp={exp}
          ></QuestionArea>
        );
      })}
    </>
  );
}

export default QuestionsSection;
