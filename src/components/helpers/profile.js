

import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.category.user);

  if (!user) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <h1>Profile Information</h1>
      <p>Email: {user.email}</p>
      {/* You might want to avoid displaying the password for security reasons */}
      <p>Password: {user.password}</p>
      
    </div>
  );
};

export default ProfilePage;


