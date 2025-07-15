import React from 'react';
import HeroImage from "../assets/HeroBg.svg";
import left1 from "../assets/Hero/left1.svg"
import left2 from "../assets/Hero/left2.svg"
import left3 from "../assets/Hero/left3.svg"
import right1 from "../assets/Hero/left4.svg"
import right2 from "../assets/Hero/left5.svg"
import right3 from "../assets/Hero/left6.svg"
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className="relative text-primary bg-cover bg-center py-12 xl:py-20" >
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                <div className="md:col-span-3 flex flex-col gap-4">
                    <div className="rounded-xl overflow-hidden  ">
                        <img src={left2} alt="Card 2" className="hidden md:flex lg:w-full  object-cover" />
                    </div>
                </div>


                <div className="md:col-span-6 text-center">
                    <p className="uppercase text-sm text-black tracking-wide mb-2">Give Hope For Homeless</p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 font-display">
                        Helping Each Other <br />
                        <span className="text-primary">Can Make World Better</span>
                    </h1>
                    <p className="text-black max-w-xl mx-auto mb-8 font-Mont">
                        We seek out world changers and difference makers around the globe, and equip them to fulfill their unique purpose.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link to="/donate">   <button className="bg-secondary hover:text-white  px-6 py-3 rounded-full">Donate Now</button></Link>
                        <button className="border border-white hover:bg-white hover:text-gray-800 px-6 py-3 rounded transition">Know About Us</button>
                    </div>
                </div>

                <div className="md:col-span-3 flex flex-col gap-4">
                    <div className="rounded-xl overflow-hidden  ">
                        <img src={right2} alt="Card 4" className=" hidden md:flex lg:w-full  object-cover" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HeroSection;
