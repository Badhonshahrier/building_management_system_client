import React from 'react';
import Banner from '../Components/Banner';
import AboutBuilding from '../Components/AboutBuilding';
import ApartmentLocation from '../Components/ApartmentLocation ';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutBuilding></AboutBuilding>
            <ApartmentLocation></ApartmentLocation>
        </div>
    );
};

export default HomePage;