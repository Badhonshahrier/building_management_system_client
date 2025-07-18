import React from 'react';
import Banner from '../Components/Banner';
import AboutBuilding from '../Components/AboutBuilding';
import ApartmentLocation from '../Components/ApartmentLocation ';
import Coupon from '../Components/Coupon';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutBuilding></AboutBuilding>
            <Coupon></Coupon>
            <ApartmentLocation></ApartmentLocation>
        </div>
    );
};

export default HomePage;