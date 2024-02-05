import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import User from "./User";
import axios from 'axios'

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const token = 'Bearer ' + localStorage.getItem("token");

  const fetchUserList = async () => {
    const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${searchFilter}`, {
      headers : {
        authorization : token,
      }
    });
    setUserList(response.data.user);
    console.log(response.data.user);
    console.log(typeof(userList));
  }

  const fetchBalance = async () => {
    // console.log("user id: " , userId);
    try {
          const response = await axios.get('http://localhost:3000/api/v1/account/balance', {userId : "65b8835fe4b112d57d8b55cb"});

          console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  fetchBalance();

  useEffect(() => {
    fetchUserList();
  }, [searchFilter])
  

  return (
    <div className="p-3">
      <div className="font-medium text-xl">Users</div>
      <SearchBar OnChangeHandler = {(e) => setSearchFilter(e.target.value)}/>
      <div>
        {userList.map((user) => {

          // fetchBalance(user._id);
          return(
            <div key={user._id}>
              <User id = {user._id} icon = {user.firstName[0]} firstName={user.firstName}/> 
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default UserList;
