import React from 'react';
import Banner from '../Components/Banner';
import AboutBuilding from '../Components/AboutBuilding';
import ApartmentLocation from '../Components/ApartmentLocation ';
import Coupon from '../Components/Coupon';
import Faq from '../Components/Dashboard/Faq';
import NewsletterContact from '../Components/NewsletterContact';
import MakeAnnouncement from '../Components/Dashboard/MakeAnnouncement';
import Announcement from '../Components/Announcement';
import Booking from '../Components/Booking';

const HomePage = () => {
    return (
        <div className='bg-base-200'>
            <Banner></Banner>
            <AboutBuilding></AboutBuilding>
            <Coupon></Coupon>
            <Announcement></Announcement>
            <ApartmentLocation></ApartmentLocation>
            <Booking></Booking>
            <Faq></Faq>
            <NewsletterContact></NewsletterContact>
        </div>
    );
};

export default HomePage;