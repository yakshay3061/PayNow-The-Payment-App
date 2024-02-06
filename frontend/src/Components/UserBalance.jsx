import React, { useState } from 'react'
import axios from 'axios'

const UserBalance = () => {

  const token = 'Bearer ' + localStorage.getItem("token");

  const [balance , setBalance] = useState("");

  const fetchBalance = async () => {
    try {
          const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
            headers : {
              authorization : token,
            }
          }
          );
          setBalance(response.data.balance.toFixed(2));
    } catch (error) {
      console.log(error);
    }
  }

  fetchBalance();


  return (
    <div className='font-medium text-xl p-3'>Your Balance : ${balance}</div>
  )
}

export default UserBalance