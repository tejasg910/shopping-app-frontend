import { useState } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-hot-toast";
import Modal from "react-responsive-modal";
interface PropsTypes {
  user: User | null;
}
const Header = ({ user }: PropsTypes) => {
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign out successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sing out failed");
    }
  };
  return (
    <div>
    
      <nav className="header">
        <Link onClick={() => setIsOpen(false)} to={"/"}>
          Home
        </Link>
        <Link onClick={() => setIsOpen(false)} to={"/search"}>
          <FaSearch />
        </Link>
        <Link onClick={() => setIsOpen(false)} to={"/cart"}>
          <FaShoppingBag />
        </Link>

        {user?._id ? (
          <>
            <button onClick={() => setIsOpen((prev) => !prev)}>
              <FaUser />
            </button>
            <Modal
              classNames={{ root: "header_modal" }}
              styles={{
                modal: {
                  position: "absolute",
                  right: 0,
                  width: "9rem",
                },
              }}
              open={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                {user?.role === "admin" && (
                  <Link to={"/admin/dashboard"}>Admin</Link>
                )}
                <Link to={"/orders"}>Orders</Link>
                <button className="header_modal_button" onClick={logoutHandler}>
                  <FaSignOutAlt />
                </button>
              </div>
            </Modal>
          </>
        ) : (
          <Link to={"/login"}>
            <FaSignInAlt />
          </Link>
        )}
      </nav>
     
    </div>
  );
};

export default Header;
