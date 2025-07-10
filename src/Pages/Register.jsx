import Lottie from "lottie-react";
import React, { use } from "react";
import registerLottie from "../assets/Animation - 1751984917319.json";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser } = use(AuthContext);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const dataObject = Object.fromEntries(formData.entries());
    const { email, password } = dataObject;
    createUser(email, password)
      .then((data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You have been successfully registered",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/");
        console.log(data.user);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col md:flex-row items-center justify-center p-6">
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="card bg-base-100 w-full max-w-md shadow-2xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center italic mb-4">
              Create Your Account
            </h2>
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="label text-gray-400 text-lg">Name</label>
                <input
                  name="name"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="label text-gray-400 text-lg">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="label text-gray-400 text-lg">Photo URL</label>
                <input
                  name="photoURL"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Paste image link from imgbb or others"
                />
              </div>
              <div>
                <label className="label text-gray-400 text-lg">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-full mt-4">
                Register
              </button>
            </form>

            <p className="text-sm text-center mt-2">
              Already have an account ?
              <a
                href="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Lottie Animation */}
      <div className="hidden md:flex justify-center">
        <Lottie
          animationData={registerLottie}
          loop={true}
          style={{ height: 500, width: 500 }}
        />
      </div>
    </div>
  );
};

export default Register;
