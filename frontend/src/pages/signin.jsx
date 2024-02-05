import React, { useState } from "react";
import Heading from "../Components/Heading";
import SubHeading from "../Components/SubHeading";
import InputField from "../Components/InputField";
import Warning from "../Components/warning";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Signin = () => {

  const navigate = useNavigate();

  

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const token = 'Bearer ' + localStorage.getItem("token");

  console.log("data" ,userName, password);

  const onClickHandler = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
        userName : userName,
        password : password,
      }, {
        headers : {
          authorization : token,
        }
      }
      )

      navigate('/bulk');

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div className="w-1/2 sm:w-1/4 mx-auto mt-16 bg-gray-300 rounded-xl p-5">
        <Heading title="Sign In" />
        <SubHeading title="Enter your credentials to access your account" />
        <InputField value = {userName} onChangeHandler = {(e) => setUserName(e.target.value)} placeholder="email" label="Email" />
        <InputField value = {password} onChangeHandler = {(e) => setPassword(e.target.value)} placeholder="password" label="Password" />
        <button
          onClick={onClickHandler}
          type="button"
          className=" w-full my-4 text-white bg-gray-900 hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Sign In
        </button>
        <Warning title="Don't have account? " link="/signup" to="Sign Up" />
      </div>
    </>
  );
};

export default Signin;
