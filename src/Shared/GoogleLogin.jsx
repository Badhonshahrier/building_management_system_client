import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const GoogleLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogle = () => {
    googleLogin()
      .then((result) => {
        const loggedUser = result.user;

        const newUser = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          photo: loggedUser.photoURL,
          role: "user", // ✅ Default role
        };

        // Insert user directly (no check)
        axios.post("https://building-management-server-omega-drab.vercel.app/users", newUser)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Google login success",
              timer: 1000,
              showConfirmButton: false,
            });
            navigate("/");
          })
          .catch((error) => {
            console.error("User insert failed:", error);
          });
      })
      .catch((error) => {
        console.error("Google login error:", error);
      });
  };

  return (
    <div className="text-center">
      <div className="divider">OR</div>
      <button
        onClick={handleGoogle}
        className="btn bg-white text-black border-[#e5e5e5]"
      >
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
