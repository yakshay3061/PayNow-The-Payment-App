import React, { useState } from "react";
import Heading from "../Components/Heading";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Send = () => {


  const notify = () => toast.success("Transaction Successful!");



  const navigate = useNavigate();


  // receiving data from  previous router(/user) from which this router has been called 
  const location = useLocation();
  const data = location.state;

  const token = "Bearer " + localStorage.getItem("token");
  const [inputAmount, setInputAmount] = useState("");

  const onChangeHandler = (e) => {
    setInputAmount(e.target.value);
  }

  const transactionHandler = async () => {

    const response = await axios.post(
      `http://localhost:3000/api/v1/account/transfer`,
      {
          firstName : data.firstName,
          to : data.id,
          amount : inputAmount,
        
      }, {
        headers : {
          authorization : token,
        }
      }
    );

    console.log(response);
    console.log('transaction successful');
    setInputAmount("");
    
    
    notify();

    setTimeout(() => {
      navigate('/bulk');
    }, 3000);
  };

  // console.log("inside send :", data);
  return (
    <>
        <ToastContainer position="top-center" autoClose={2000} />
        <div className="w-1/2 sm:w-1/4 mx-auto mt-16 bg-gray-300 rounded-xl p-5">
        <Heading title="Send Money" />
        <div className="flex items-center mt-5">
          <div className="w-10 ml-0 bg-green-600 text-center p-2 rounded-full">
            U1
          </div>
          <div className="ml-2 font-bold">{data.firstName}</div>
        </div>
        <div className="ml-1 mt-3 font-normal">Amount(in Rs)</div>
        <input
          onChange={onChangeHandler}
          value={inputAmount}
          id="inputField"
          placeholder="Enter amount"
          type="text"
          className="w-full mt-0 border rounded-md border-slate-300 focus:outline-none focus:border-gray-600  pl-2 h-8"
        />
        <button
          onClick={transactionHandler}
          type="button"
          className=" w-full my-4 text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Initiate Transfer
        </button>
      </div>
    </>
  );
};

export default Send;
