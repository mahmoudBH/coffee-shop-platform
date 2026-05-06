import React from "react";
import PagesBanner from "./PagesBanner"; // Assuming PagesBanner is a component for displaying a banner
import ProfileContent from "../Profile/Profile"; // This could be a new component that contains the user profile data

const Profile = () => {
  return (
    <>
      <PagesBanner title="Your Profile" />  {/* Add PagesBanner with the title */}
      <ProfileContent />  {/* Add ProfileContent component for the profile details */}
    </>
  );
};

export default Profile;
