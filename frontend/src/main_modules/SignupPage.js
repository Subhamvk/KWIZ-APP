import MajorSide from "../components/MajorSide";
import MinorSide from "../components/MinorSide";
import Form from "../components/Form";
import InputField from "../components/InputField";
import Button from "../components/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../firebase-auth/firebase";
import ReactLoading from "react-loading";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const SignupPage = () => {
  const formLabel = "Sign up";
  const buttonLabel = "Sign up";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);
  const state = useSelector((state) => ({ ...state }));
  
  const url = process.env.REACT_APP_URL;

  useEffect(() => {
    if (state && state.user) {
      if (state.user.role === "student") navigate("/dashboard");
      else navigate("/admin");
    }
  });

  const goToLogin = () => {
    navigate("/login");
  };

  const SignUp = async (e) => {
    e.preventDefault();
    
    let items = { email, name, password };
    
    if (email.indexOf("@mnnit.ac.in") < 0) {
      alert("use only MNNIT Email !!!");
      return;
    }
    setFlag(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      
      sendEmailVerification(auth.currentUser).then(() => {
        alert("Email verification link send !!");
      });
      if (user) {
        const res = await fetch(url + "/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            email: email.toLowerCase(),
            password: password,
          },
        });
        if (res.status === 200) {
          const data = await res.json();

          navigate("/login");
        }
        if (res.status === 403) {
          alert("already exist please login !!");
          navigate("/login");
        }
      }
    } catch (error) {
      alert(error.code);
    }

    setFlag(false);
  };
  return (
    <>
      <div className="flex w-full h-screen">
        <MinorSide
          text1="Already Registered?"
          text2="Start taking your quizzes now."
          text3="Just select your questions with a click."
          buttonLabel="Sign in"
          onClick={goToLogin}
        ></MinorSide>

        <MajorSide>
          <Form formLabel={formLabel}>
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

            {/* Name */}
            <InputField
              labelHtmlFor="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-green"
              labelPlaceHolder="Name"
              inputType="text"
              inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              inputPlaceholder="Enter your name"
            ></InputField>

            {/* password */}
            <InputField
              labelHtmlFor="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-green"
              labelPlaceHolder="Password"
              inputType="password"
              inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              inputPlaceholder="•••••••••••••"
            ></InputField>
            
            <div className="px-3">
                {flag && (
                  <ReactLoading
                    type="balls"
                    color="#0000FF"
                    height={100}
                    width={50}
                  />
                )}

            </div>

            {/* submit button */}
            <Button
              onClick={SignUp}
              ButtonType="submit"
              buttonClassName="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center min-w-[4rem] max-w-[6rem] w-4/12 my-3"
              buttonLabel={buttonLabel}
            ></Button>
          </Form>

          {/* Only For small devices - Log in */}
          <div className="sm:hidden bg-red-100 absolute right-0 top-0">
            <span className="text-sm cursor-default">Already Registered?</span>
            <span
              className="font-bold m-1 text-sm text-blue-800 cursor-pointer"
              onClick={goToLogin}
            >
              Log in
            </span>
          </div>
        </MajorSide>
      </div>
    </>
  );
};

export default SignupPage;
