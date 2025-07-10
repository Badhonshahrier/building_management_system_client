import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <div className="w-11/12 mx-auto mt-16 px-4">
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
            src="https://i.ibb.co/qY7vTgKS/stock-photo-modern-architecture-of-urban-residential-apartment-buildings-with-park-at-sunset-1865190.jpg"
            alt="Apartment 1"
            className="h-[500px] w-full object-cover"
          />
          <p className="legend">Luxurious Modern Apartment</p>
        </div>
        <div>
          <img
            src="https://i.ibb.co/hRymgJ03/BMS-Solution-Overview-2-1.png"
            alt="Apartment 2"
            className="h-[500px] w-full object-cover"
          />
          <p className="legend">Peaceful & Green Environment</p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
            alt="Apartment 3"
            className="h-[500px] w-full object-cover"
          />
          <p className="legend">Secure Family Friendly Flats</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
