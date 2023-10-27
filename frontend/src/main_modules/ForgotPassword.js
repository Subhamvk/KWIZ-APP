import MajorSide from "../components/MajorSide";
import MinorSide from "../components/MinorSide";
import Form from "../components/Form";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase-auth/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import ReactLoading from "react-loading";
function ForgetPassword() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [flag, setFlag] = useState(false);
  const [password, setPassword] = useState("");
  let dispatch = useDispatch();
  const url = process.env.REACT_APP_URL;
  const fp = process.env.REACT_APP_FPURL;

  const state = useSelector((state) => ({ ...state }));
  

  const goToSignUp = () => {
    navigate("/signup");
  };

  const Sendlink = async (e) => {
    e.preventDefault();
    setFlag(true);
    sendPasswordResetEmail(auth, email,{url:"https://kwiz-app.vercel.app/login"})
      .then(() => {
        alert("Password reset email send !!")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });

    setFlag(false);
  };
  return (
    <>
      <div className="flex w-full h-screen">
        <MajorSide>
          <Form>
            {/* ID */}
            <InputField
              labelHtmlFor="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-green"
              labelPlaceHolder="e-mail"
              inputType="text"
              inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              inputPlaceholder="Enter e-mail"
            ></InputField>
              {flag && (
                  <ReactLoading
                    type="balls"
                    color="#0000FF"
                    height={100}
                    width={50}
                  />
                )}
            {/* submit button */}
            <Button
              ButtonType="submit"
              onClick={Sendlink}
              buttonClassName="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center min-w-[4rem] max-w-[6rem] w-4/12 m-2"
              buttonLabel="Send Link"
            ></Button>

            
          </Form>

          {/* Only For small devices - sign up */}
          <div className="sm:hidden bg-red-100 absolute right-0 top-0">
            <span className="text-sm cursor-default">New here?</span>
            <span
              className="font-bold m-1 text-sm text-blue-800 cursor-pointer"
              onClick={goToSignUp}
            >
              Sign Up
            </span>
          </div>
        </MajorSide>

        <MinorSide
          text1="New Here?"
          text2="Sign up and take your quizzes here."
          text3="Choose from a variety of questions or add your own."
          buttonLabel="Sign up"
          onClick={goToSignUp}
        ></MinorSide>
      </div>
    </>
  );
}

export default ForgetPassword;
