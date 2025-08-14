import React from "react";

const Profile = () => {
  const auth = JSON.parse(localStorage.getItem("user"));

  console.log(auth);

  return (
    <div className=" flex justify-center flex-col items-center mt-20">
      <div className=" border-1 p-3 w-30 h-30 rounded-full flex justify-center items-center mb-3">
        <img className="rounded-full" src="src\assets\profile_pic.jpg" alt="" />
      </div>
      <input className="items-center border-1 mb-5" type="file" name="image" />
      <p>Username : {auth.name}</p>
      <p>Registered Email : {auth.email}</p>
    </div>
  );
};

export default Profile;
