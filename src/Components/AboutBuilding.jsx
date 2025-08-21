import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FiHome } from "react-icons/fi";
import { MdLock } from "react-icons/md";
import { MdElectricBolt } from "react-icons/md";
import { MdSignalWifiConnectedNoInternet4 } from "react-icons/md";
import { FaMoneyBill1Wave } from "react-icons/fa6";
const AboutBuilding = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  });

  return (
    <div>
      <h1 className="text-center pt-20 text-4xl text-gray-600 font-bold italic ">
        About Building
      </h1>
      <p className="text-center w-4/6 mx-auto pt-3 pb-6 text-gray-800">
        An apartment management system helps organize and streamline daily
        operations for residential complexes. It manages tenant information,
        rent payments, maintenance requests, agreements, and announcements.
      </p>
      <section className="bg-gray-300 w-11/12 mx-auto rounded-3xl px-4 lg:px-0 py-10">
        <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div data-aos="fade-in">
            <img
              src="https://i.ibb.co/fd4PTGSd/apartment-apartment-building-architecture-323705.jpg"
              alt=""
              className="rounded-2xl shadow-lg h-[600px] w-full object-cover"
            />
          </div>

          <div data-aos="fade-in">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
              Where Elegance Meets{" "}
              <span className="text-blue-600">Comfort</span>
            </h2>
            <p className="text-lg text-gray-600 mb-5 leading-relaxed">
              Welcome to our premium apartment complex — a space designed for
              modern living. Located in the heart of the city, our 10-storey
              smart building offers 30+ luxury flats with high-end amenities and
              24/7 intelligent management.
            </p>
            <ul className="space-y-8 text-gray-700">
              <li className="flex items-center font-bold">
                <FiHome className="mr-2" color="blue" size={20} /> 10 Floors,
                30+ Designer Apartments
              </li>
              <li className="flex items-center font-bold ">
                <MdLock className="mr-2" color="Red" size={20} /> 24/7 Security
                Surveillance & Access Control
              </li>
              <li className="flex items-center font-bold">
                <MdElectricBolt className="mr-2" color="Yellow" size={20} />{" "}
                Power Backup & Smart Elevator Systems
              </li>
              <li className="flex items-center font-bold">
                <MdSignalWifiConnectedNoInternet4
                  className="mr-2"
                  color="light-blue"
                  size={20}
                />{" "}
                High-Speed Internet and IoT Connectivity
              </li>
              <li className="flex items-center font-bold">
                <FaMoneyBill1Wave className="mr-2" color="Green" size={20} />{" "}
                Rent & Utility Payments via Online Dashboard
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutBuilding;
