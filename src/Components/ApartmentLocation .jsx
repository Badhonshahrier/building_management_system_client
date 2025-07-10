import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { PiMapPinAreaDuotone } from "react-icons/pi";
import {
  FaBus,
  FaCar,
  FaHospital,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "leaflet/dist/leaflet.css";

const ApartmentLocation = () => {
  const position = [23.685, 90.3563];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="flex items-center justify-center text-4xl font-extrabold text-gray-800 mb-4">
          <PiMapPinAreaDuotone className="mr-3 text-green-600 text-5xl" />
          Our Apartment Location
        </h2>
        <p className="text-center text-gray-600 text-lg mb-10 max-w-3xl mx-auto">
          You can easily reach our apartment from anywhere in Dhaka. Here's how
          to find us :
        </p>

        <div className="">
          <div className="rounded-xl overflow-hidden shadow-md">
            <MapContainer
              center={position}
              zoom={7}
              scrollWheelZoom={false}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              />
              <Marker position={position}>
                <Popup>
                  Apartment HQ <br />
                  Dhaka, Bangladesh
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className=" p-6 rounded-xl">
            <h3 className="text-2xl text-center justify-center font-semibold text-gray-800 mb-4 ">
              <FaMapMarkerAlt className="mr-2 text-green-600" />
              How to Reach Us
            </h3>
            <ul className="space-y-3 flex flex-col items-center text-gray-700">
              <li className="flex items-center text-center">
                <FaBus className="text-green-500 mt-1 mr-2" />
                <span>
                  <strong>Bus Route :</strong> Get off at Dhanmondi 27 or
                  Shimanto Square Bus Stop.
                </span>
              </li>
              <li className="flex items-start">
                <FaCar className="text-blue-500 mt-1 mr-2" />
                <span>
                  <strong>Ride Sharing :</strong> Uber, Pathao, CNG are
                  available. Just search “House 15, Road 27”.
                </span>
              </li>
              <li className="flex items-start">
                <FaHospital className="text-red-500 mt-1 mr-2" />
                <span>
                  <strong>Landmarks :</strong> Near Labaid Hospital, opposite
                  Dhanmondi Lake.
                </span>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-pink-600 mt-1 mr-2" />
                <span>
                  <strong>Address :</strong> House-15, Road-27, Dhanmondi, Dhaka
                  1209
                </span>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-yellow-600 mt-1 mr-2" />
                <span>
                  <strong>Phone :</strong> +880 1234-567890
                </span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-purple-600 mt-1 mr-2" />
                <span>
                  <strong>Email :</strong> info@yourapartment.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApartmentLocation;
