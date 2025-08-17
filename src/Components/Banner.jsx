import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <div className="w-11/12 mx-auto py-10 px-4">
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        showThumbs={false}
        showStatus={false}
        transitionTime={800}
        className="rounded-2xl overflow-hidden shadow-xl"
      >
        <div>
          <img
            src="https://i.ibb.co.com/Mm415Mv/what-is-a-property-manager-2124842-v4-HL-e6e5455639a04ac0a0489fc911b68d18.png"
            alt="Apartment 1"
            className="h-[550px] w-full object-fill"
          />
          <p className="legend">Luxurious Modern Apartment</p>
        </div>
        <div>
          <img
            src="https://i.ibb.co.com/M5t1w4Dn/Building-Management-System-7970ca28f1.png"
            alt="Apartment 2"
            className="h-[550px] w-full object-fill"
          />
          <button className="legend">Peaceful & Green Environment</button>
        </div>
        
        <div>
          <img
            src="https://i.ibb.co.com/Dg7VT92h/Types-of-Property-Management-Systems.png"
            alt="Apartment 3"
            className="h-[550px] w-full object-fill"
          />
          <p className="legend">Secure Family Friendly Flats</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
