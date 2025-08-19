import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="w-full mx-auto py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <Carousel
          autoPlay
          infiniteLoop
          interval={3000}
          showThumbs={false}
          showStatus={false}
          transitionTime={800}
          className="rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="relative">
            <img
              src="https://i.ibb.co/Mm415Mv/what-is-a-property-manager-2124842-v4-HL-e6e5455639a04ac0a0489fc911b68d18.png"
              alt="Luxurious Modern Apartment"
              className="h-[550px] md:h-[600px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 p-8 text-center text-white">
              <h2 className="text-sm md:text-4xl md:font-bold font-normal hidden md:block lg:block mb-2">
                Luxurious Modern Apartment
              </h2>
              <p className="text-lg md:text-xl opacity-90 hidden md:block lg:block">
                Experience comfort and elegance in our premium apartments
              </p>
              <Link to="/login">
              
              <button className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Explore Now
              </button></Link>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://i.ibb.co/M5t1w4Dn/Building-Management-System-7970ca28f1.png"
              alt="Peaceful & Green Environment"
              className="h-[550px] md:h-[600px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 p-8 text-center text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 hidden md:block lg:block">
                Peaceful & Green Environment
              </h2>
              <p className="text-lg md:text-xl opacity-90 hidden md:block lg:block">
                Relax in a serene and eco-friendly neighborhood
              </p>
              <Link to="/login">
              <button className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Take a Tour
              </button></Link>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://i.ibb.co/Dg7VT92h/Types-of-Property-Management-Systems.png"
              alt="Secure Family Friendly Flats"
              className="h-[550px] md:h-[600px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 p-8 text-center text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 hidden md:block lg:block">
                Secure Family Friendly Flats
              </h2>
              <p className="text-lg md:text-xl opacity-90 hidden md:block lg:block">
                Safe and welcoming environment for your family
              </p>
              <Link to="/login">
              <button className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Learn More
              </button>
              </Link>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
