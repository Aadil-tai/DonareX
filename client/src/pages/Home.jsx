import React from 'react';
import HeroSection from '../components/Herosection';
import MissionVision from '../components/missionvision/MissionVision';
import ContactUs from '../components/Contactus';
import Marquee from '../components/Marquee';

const Home = () => {
    return (
        <div className='p-4 lg:p-12'>


            <section id="home">
                <HeroSection />
            </section>

            <section id="about">
                <MissionVision />
            </section>

            <section id="contact">
                <ContactUs />
            </section>
        </div>
    );
};

export default Home;
