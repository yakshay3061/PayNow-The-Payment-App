import React from "react";
import Appbar from "../Components/Appbar";
import UserBalance from "../Components/UserBalance";
import UserList from "../Components/UserList";

const Dashboard = () => {
  return (
    <div className="divide-y-2 divide-gray-300">
      <div>
        <Appbar />
      </div>
      <div>
        <UserBalance />
        <UserList />
      </div>
    </div>
  );
};

export default Dashboard;
