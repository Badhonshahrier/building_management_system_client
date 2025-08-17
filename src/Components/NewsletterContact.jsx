import React, { useState } from "react";

const NewsletterContact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSuccess(true);
      setEmail("");
    }
  };

  const handleContact = (e) => {
    e.preventDefault();
    if (email && message) {
      setSuccess(true);
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="w-11/12 md:w-10/12 mx-auto py-20">
      <h2 className="text-4xl font-bold text-center text-gray-600 mb-4 italic dark:text-white">
        Stay Connected
      </h2>
      <p className="text-center text-gray-500 mb-10 max-w-3xl mx-auto text-sm sm:text-base dark:text-white">
        Subscribe to our newsletter for updates or contact us directly for any
        queries regarding your building management.
      </p>

      {/* Newsletter Form */}
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">
            Newsletter
          </h3>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-gray-400 text-white font-semibold py-2 rounded-md hover:bg-teal-700 transition-colors "
            >
              Subscribe
            </button>
            {success && (
              <p className="text-green-600 font-medium dark:text-white">
                Thank you! You are subscribed.
              </p>
            )}
          </form>
        </div>

        {/* Contact Form */}
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">Contact Us</h3>
          <form onSubmit={handleContact} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Your email"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Your message"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button
              type="submit"
              className="bg-gray-400 text-white font-semibold py-2 rounded-md hover:bg-teal-700 transition-colors"
            >
              Send Message
            </button>
            {success && (
              <p className="text-green-600 font-medium dark:text-white">
                Thank you! Your message has been sent.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterContact;
