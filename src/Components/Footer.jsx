import { FaFacebook, FaTwitter, FaLinkedin, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router";
import footerImg from "../../public/Screenshot_35-removebg-preview.png"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-20 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

     
        <div>
            <div className="flex items-center" >
                <img className="h-14 w-14" src={footerImg} alt="" />
          <h2 className="text-2xl font-bold text-white mb-3">BuildingManager</h2>
            </div>
          <p>Manage your dream apartment with ease. Stay updated, pay smart, and live secure in a single building system.</p>
        </div>

  
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/apartments" className="hover:text-white">Apartments</Link></li>
            <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li><FaMapMarkerAlt className="inline mr-2" />123 Main Street, Dhaka</li>
            <li><FaPhone className="inline mr-2" /> +8801234567890</li>
            <li><FaEnvelope className="inline mr-2" /> info@buildingmanager.com</li>
          </ul>
        </div>

    
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Follow Us</h3>
          <div className="flex space-x-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="" className="hover:text-white"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="" className="hover:text-white"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="" className="hover:text-white"><FaLinkedin /></a>
          </div>
        </div>
      </div>
<div className="text-center text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} BuildingManager. All rights reserved.
      </div>
    </footer>
  );
};
export default Footer;