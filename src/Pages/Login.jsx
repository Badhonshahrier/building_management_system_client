import React, { use } from "react";
import loginLottie from "../assets/Animation - 1751982665370.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import GoogleLogin from "../Shared/GoogleLogin";

const Login = () => {
  const { userLogin } = use(AuthContext);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    userLogin(email, password).then((data) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You have been successfully Login",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/");
      console.log(data.user);
    });
  };
  return (
    <div className="min-h-screen bg-base-200 flex flex-col md:flex-row items-center justify-center">
      <div className="w-full md:w-1/4 flex justify-center">
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center italic mb-4">
              Please Login Here
            </h2>
            <form onSubmit={handleLogin} className="space-y-2">
              <label className="label text-xl text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Email"
              />
              <label className="label text-xl text-gray-400">Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                placeholder="Password"
              />
              <div className=" mt-1">
                <a className="link link-hover text-sm">Forgot password?</a>
              </div>
              <p className="font-medium">
                Don't have account ?Please{" "}
                <Link to="/register">
                  <span className="text-red-600">Register</span>
                </Link>{" "}
                here
              </p>
              <button className="btn bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 mt-4 w-full">Login</button>
               <GoogleLogin></GoogleLogin>
            </form>
          </div>
        </div>
      </div>
      <div className="">
        <Lottie
          animationData={loginLottie}
          loop={true}
          style={{ height: 500, width: 500 }}
        />
      </div>
     
    </div>
  );
};

export default Login;
