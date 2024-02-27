import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [gender, setGender] = useState<string>("");
  const [date, setDate] = useState<string>("");
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
            name="date"
          />
        </div>
        <div>
          <p>New user?</p>
          <button>
            <FcGoogle />
            <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
