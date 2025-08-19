import React from "react";
import Banner from "../Components/Banner";
import AboutBuilding from "../Components/AboutBuilding";
import ApartmentLocation from "../Components/ApartmentLocation ";
import Coupon from "../Components/Coupon";
import Faq from "../Components/Dashboard/Faq";
import NewsletterContact from "../Components/NewsletterContact";
import MakeAnnouncement from "../Components/Dashboard/MakeAnnouncement";
import Announcement from "../Components/Announcement";
import Booking from "../Components/Booking";
import ReviewSection from "../Components/ReviewSection";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Banner></Banner>
      <AboutBuilding></AboutBuilding>
      <Coupon></Coupon>
      <Announcement></Announcement>
      <ApartmentLocation></ApartmentLocation>

      <ReviewSection></ReviewSection>
      <Faq></Faq>
      <Booking></Booking>
    </div>
  );
};

export default HomePage;
