import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { getUser, useLoginMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { messageResponse } from "../types/api_types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userExists, userNotExists } from "../redux/reducer/userReducer";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Login = () => {
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const loginHandler = async (type: string) => {
    try {
      if (type === "google") {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, provider);
        const response = await login({
          _id: user.uid,

          email: user.email!,

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
      } else if (type == "github") {
        const provider = new GithubAuthProvider();
        const { user } = await signInWithPopup(auth, provider);

        console.log(user, "this is user");
        const response = await login({
          _id: user.uid,

          email: user.email!,

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

          // navigate("/");
        } else {
          const error = response.error as FetchBaseQueryError;
          const message = (error.data as messageResponse).message;
          toast.error(message);
        }
      } else if (type == "twitter") {
        const provider = new TwitterAuthProvider();
        const { user } = await signInWithPopup(auth, provider);

        console.log(user, "this is user");
        const response = await login({
          _id: user.uid,

          email: user.email!,

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

          // navigate("/");
        } else {
          const error = response.error as FetchBaseQueryError;
          const message = (error.data as messageResponse).message;
          toast.error(message);
        }
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Sign in failed");
    }
  };
  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>

        {/* <div>
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
        </div> */}
        <div>
          {/* <p>New user?</p> */}
          <button
            className="google_login_button"
            onClick={() => {
              loginHandler("google");
            }}
          >
            <FcGoogle />
            <span>Sign in with Google</span>
          </button>
          <button
            className="github_login_button"
            onClick={() => {
              loginHandler("github");
            }}
          >
            <FaGithub />
            <span>Sign in with Github</span>
          </button>

          <button
            className="twitter_login_button"
            onClick={() => {
              loginHandler("twitter");
            }}
          >
            <FaSquareXTwitter />
            <span>Sign in with X</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
