

import React from "react";
import { useSelector } from "react-redux";
import "./profile.css"; 

const ProfilePage = () => {
  const user = useSelector((state) => state.category.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile Information</h1>
      <div className="profile-details">
        <p className="profile-info">Email: {user.email}</p>
        {/* You might want to avoid displaying the password for security reasons */}
        <p className="profile-info">Password: {user.password}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
