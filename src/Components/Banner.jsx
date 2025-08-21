import { use, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ChevronLeft, ChevronRight, Home, Shield, Leaf, Users } from 'lucide-react';
import { AuthContext } from '../Provider/AuthProvider';
import { NavLink } from 'react-router';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const {user}=use(AuthContext)

  const slides = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Your Dream Home Awaits",
      subtitle: "Premium Living Spaces",
      description: "Discover luxury apartments designed for modern living with world-class amenities and breathtaking views.",
      icon: Home,
      ctaText: "Find Your Home",
      gradient: "from-blue-600/90 via-purple-600/90 to-pink-600/90"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Security & Peace of Mind",
      subtitle: "24/7 Protected Environment",
      description: "Live with confidence in our secure communities featuring advanced security systems and dedicated staff.",
      icon: Shield,
      ctaText: "Learn About Security",
      gradient: "from-emerald-600/90 via-teal-600/90 to-cyan-600/90"
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Sustainable Living",
      subtitle: "Eco-Friendly Communities",
      description: "Be part of green living with sustainable architecture, solar power, and lush landscaping throughout.",
      icon: Leaf,
      ctaText: "Explore Green Living",
      gradient: "from-green-600/90 via-lime-600/90 to-emerald-600/90"
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Community & Connection",
      subtitle: "Where Neighbors Become Family",
      description: "Join a vibrant community with shared spaces, events, and amenities that bring people together.",
      icon: Users,
      ctaText: "Join Our Community",
      gradient: "from-orange-600/90 via-red-600/90 to-pink-600/90"
    }
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className='pt-6'>
      <div className="relative w-11/12 h-[580px] mx-auto rounded-3xl   overflow-hidden bg-gray-900">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="md:ml-16 px-6">
          <div className="max-w-4xl">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-700 ${
                  index === currentSlide 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8 absolute'
                }`}
              >
                {index === currentSlide && (
                  <>
                    {/* Icon */}
                    <div 
                      className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6"
                      data-aos="zoom-in"
                      data-aos-delay="200"
                    >
                      <slide.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Subtitle */}
                    <p 
                      className="text-white/90 text-lg md:text-xl font-medium mb-4 tracking-wide"
                      data-aos="fade-up"
                      data-aos-delay="300"
                    >
                      {slide.subtitle}
                    </p>

                    {/* Main Title */}
                    <h1 
                      className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                      data-aos="fade-up"
                      data-aos-delay="400"
                    >
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p 
                      className="text-white/80 text-xl md:text-2xl leading-relaxed mb-8 max-w-2xl"
                      data-aos="fade-up"
                      data-aos-delay="500"
                    >
                      {slide.description}
                    </p>

                    {/* CTA Buttons */}
                    <div 
                      className="flex flex-col sm:flex-row gap-4"
                      data-aos="fade-up"
                      data-aos-delay="600"
                    >
                      {
                        user?(<button className="group relative px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl">
                        <span className="relative z-10">{slide.ctaText}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
                          {slide.ctaText}
                        </span>
                      </button>):(<NavLink to="/login"><button className="group relative px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl">
                        <span className="relative z-10">{slide.ctaText}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
                          {slide.ctaText}
                        </span>
                      </button></NavLink>)
                      }
                      
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 hover:transform hover:scale-110"
        data-aos="fade-right"
        data-aos-delay="800"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 hover:transform hover:scale-110"
        data-aos="fade-left"
        data-aos-delay="800"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3"
        data-aos="fade-up"
        data-aos-delay="900"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 right-8 z-20 flex flex-col items-center space-y-2 text-white/70"
        data-aos="fade-up"
        data-aos-delay="1000"
      >
        <span className="text-sm font-medium tracking-wider rotate-90 origin-center">SCROLL</span>
        <div className="w-px h-12 bg-white/30">
          <div className="w-full h-4 bg-white/70 animate-pulse" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Banner;