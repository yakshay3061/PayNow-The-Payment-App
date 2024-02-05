import React, { useState } from "react";
import Heading from "../Components/Heading";
import SubHeading from "../Components/SubHeading";
import InputField from "../Components/InputField";
import Warning from "../Components/warning";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const token = 'Bearer ' + localStorage.getItem("token");

  const navigate = useNavigate();
  const navigateToSignin = () => {
    navigate('/signin');
  }

  const clearInputFields = () => {
    setFirstName("");
    setLastName("");
    setUserName("");
    setPassword("");
  }

  return (
    <>
      <div className="w-1/2 sm:w-1/4 mx-auto mt-16 bg-gray-300 rounded-xl p-5">
        <Heading title="Sign Up" />
        <SubHeading title="Enter your information to create an account" />
        <InputField value = {firstName} onChangeHandler={(e) => setFirstName(e.target.value)} label="First Name" placeholder="firstname" />
        <InputField value = {lastName} onChangeHandler={(e) => setLastName(e.target.value)} label="Last Name" placeholder="lastname" />
        <InputField value = {userName} onChangeHandler={(e) => setUserName(e.target.value)} label="Email" placeholder="email" />
        <InputField value = {password} onChangeHandler={(e) => setPassword(e.target.value)} label="password" placeholder="password" />
        <button
          type="button"
          onClick={async () => {
            try {
              const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
              firstName,
              lastName,
              userName,
              password,
            });
              localStorage.setItem("token", response.data.token);
            } catch (error) {
              console.log(error);
              window.alert("something went wrong");
            }

            clearInputFields();
            navigateToSignin();
          }

         }
          className=" w-full my-4 text-white bg-gray-900 hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Sign Up
        </button>
        <Warning title="Already have account? " link="/" to="Login" />
      </div>
    </>
  );
};

export default Signup;
