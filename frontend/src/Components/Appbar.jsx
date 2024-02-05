import React from "react";
import UserProfile from "../pages/UserProfile";

const Appbar = () => {
  return (
    <div className="flex justify-between p-3">
      <div className="left font-medium text-2xl ">Payments App</div>
      <div className="right flex items-center">
        <p>Hello</p>
        <p className="pl-2">User</p>
        <UserProfile />
      </div>
    </div>
  );
};

export default Appbar;
