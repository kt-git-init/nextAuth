import React from "react";

const UserProfilePage = ({ params }: any) => {
  return (
    <div>
      <h1>Profile</h1>
      <p>Profile Page</p>
      <span>{params.userid}</span>
    </div>
  );
};

export default UserProfilePage;
