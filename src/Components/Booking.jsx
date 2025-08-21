import { useState } from "react";
import { Mail } from "lucide-react";
import Swal from "sweetalert2";

const Booking = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire("Please enter your email!");
      return;
    }
    console.log("Subscribed with:", email);

    Swal.fire("Subscribed successfully!");
    setEmail("");
  };

  return (
    <div className="w-full py-12 px-6 bg-gray-200 mt-16">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900">
          Subscribe to Our Newsletter
        </h2>
        <p className="mt-3 text-gray-700 max-w-2xl mx-auto">
          Stay updated with the latest Rent price, announcements, and
          community news straight to your inbox.Thank You
        </p>

        <form
          onSubmit={handleSubscribe}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <div className="relative w-full sm:w-96">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-black border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-md transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
