import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import { userReducerInitialState } from "../types/reducer_types";
import toast from "react-hot-toast";

const EmailUpdate = ({
  handleOpenModal,
  onCloseModal,
}: {
  handleOpenModal: boolean;
  onCloseModal: () => void;
}) => {
  const { user, loading } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const [email, setEmail] = useState("");

  const [emailUpdateLoading, setEmailUpdateLoading] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUpdate = async () => {
    setEmailUpdateLoading(true);
    // Logic to update email
    console.log("Email updated to:", email);
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_SERVER}/api/v1/user/user/updateUserEmail/${
          user?._id
        }`,
        { email }
      );
      console.log(data);
      setEmailUpdateLoading(false);
      toast.success(data.message);
    } catch (error) {
      setEmailUpdateLoading(false);
      console.log(error, "this is error");
      throw error;
    }
  };

  if (loading) {
    return;
  }

  return (
    <Modal
      open={handleOpenModal}
      onClose={onCloseModal}
      closeOnOverlayClick={false}
      center
    >
      <div className="email-update-container">
        <h2>Update Email</h2>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your new email"
          className="email-input"
        />
        <button onClick={handleUpdate} className="update-button">
          {emailUpdateLoading ? "updating" : "update"}
        </button>
      </div>
    </Modal>
  );
};

export default EmailUpdate;
