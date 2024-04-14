import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { getUser, useLoginMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { messageResponse } from "../types/api_types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userExists, userNotExists } from "../redux/reducer/userReducer";

const Login = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const response = await login({
        _id: user.uid,
        dob: date,
        email: user.email!,
        gender,
        image: user.photoURL!,
        name: user.displayName!,

        role: "user",
      });

      if ("data" in response) {
        toast.success(response.data.message);
        console.log("api hitt");
        const getUserResponse = await getUser(user.uid);

        // Check if user exists in the database
        if (getUserResponse && "data" in getUserResponse) {
          console.log(getUserResponse);

          const userData = getUserResponse.data;

          dispatch(userExists(userData));
        } else {
          dispatch(userNotExists());
          toast.error("Something went wrong");
        }

        navigate("/");
      } else {
        const error = response.error as FetchBaseQueryError;
        const message = (error.data as messageResponse).message;
        toast.error(message);
      }
    } catch (error) {
      toast.error("Sign in failed");
    }
  };
  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>

        <div>
          <label htmlFor="">Gender</label>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            name="gender"
            id=""
          >
            <option value="">choose gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Date Of Birth</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            name="date"
          />
        </div>
        <div>
          <p>New user?</p>
          <button onClick={loginHandler}>
            <FcGoogle />
            <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
