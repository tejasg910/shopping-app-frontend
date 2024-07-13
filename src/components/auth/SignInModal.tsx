import  { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Modal from "react-responsive-modal";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getUser, useLoginMutation } from "../../redux/api/userApi";
import { useNavigate } from "react-router-dom";
import { userExists, userNotExists } from "../../redux/reducer/userReducer";

const SignInModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const loginHandler = async (type: string) => {
    try {
      if (type == "email") {
        if (!email || !password) {
          return toast.error("Please provide all fields");
        }
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Signed in

        console.log(user);

        const response = await login({
          _id: user.uid,

          email: user.email!,

          image: user.photoURL!,
          name: user.displayName!,

          role: "user",
        });

        if ("data" in response) {
          toast.success(response?.data?.message!);
          console.log("api hitt");
          const getUserResponse = await getUser(user.uid);

          // Check if user exists in the database
          if (getUserResponse && "data" in getUserResponse) {
            console.log(getUserResponse);
            navigate("/");
            const userData = getUserResponse.data;

            dispatch(userExists(userData));
          } else {
            dispatch(userNotExists());
            toast.error("Something went wrong");
          }
        }

        // ...
      }
    } catch (error: any) {
      dispatch(userNotExists());

      console.log(error);
      toast.error(error?.message || "Sign in failed");
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="sign_in_modal_container">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
        />
        <button
          onClick={() => {
            loginHandler("email");
          }}
          className="login-button"
        >
          Login
        </button>
      </div>
    </Modal>
  );
};

export default SignInModal;
