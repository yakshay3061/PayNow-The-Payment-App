import React from 'react'
import { useNavigate } from "react-router-dom";


const User = ({icon = "U", firstName, id}) => {
  const navigate = useNavigate();



  const sendMoneyNavigator = () => {

    // to send data to /send router 
    navigate('/send', {state :  {firstName : firstName, id : id}});
  }

  return (
    <div className='flex justify-between items-center m-3'>
        <div className='flex items-center'>
            <div className='w-10 ml-2 bg-slate-400 text-center p-2 rounded-full'>{icon}</div>
            <div className='ml-2 font-medium'>{firstName}</div>
        </div>
        <button 
          onClick={sendMoneyNavigator}
          type="button"
          className="my-4 text-white bg-gray-900 hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Send Money
        </button>
    </div>
  )
}

export default User