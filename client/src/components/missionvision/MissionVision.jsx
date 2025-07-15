import React from 'react';
import missionImg from '../../assets/Mission/missionbg.png';
import visionImg1 from '../../assets/Mission/vision1.png';
import visionImg2 from '../../assets/Mission/vision2.png';
import visionImg3 from '../../assets/Mission/vision3.png';

const MissionVision = () => {
    return (
        <section className="relative py-4 md:py-8 lg:py-20 bg-[#fff6f6] text-gray-800 font-playfair overflow-hidden">
            <h2 className="text-center text-3xl text-primary md:text-4xl font-bold mb-16">GET TO KNOW US</h2>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-6">

                <div className="flex flex-col justify-center order-1">
                    <span className="text-sm text-gray-500 mb-2">About us</span>
                    <h3 className="text-2xl font-bold text-secondary mb-4">Our Mission</h3>
                    <p className="text-gray-600 mb-4">
                        To build a community that supports elderly people with compassion, emotional care, and dignity.
                    </p>
                    <p className="text-gray-600 mb-6">
                        To educate families and caregivers on how to properly care for the physical and emotional needs of seniors.
                    </p>
                    <button className="border border-primary text-secondary px-6 py-2 rounded hover:bg-primary hover:text-white transition">
                        Learn More &gt;
                    </button>
                </div>
                <div className="order-2">
                    <img
                        src={missionImg}
                        alt="Helping elderly"
                        className="rounded-2xl w-full object-cover"
                    />
                </div>


                <div className="order-4 md:order-3 flex flex-col md:flex-row gap-6">

                    <div className="w-full ">
                        <img
                            src={visionImg1}
                            alt="vision main"
                            className="rounded-2xl w-full h-full object-cover"
                        />
                    </div>


                    <div className="w-full hidden md:w-[60%] md:flex flex-col gap-6">
                        <img
                            src={visionImg2}
                            alt="vision top"
                            className="rounded-xl w-full  object-cover"
                        />
                        <img
                            src={visionImg3}
                            alt="vision bottom"
                            className="rounded-xl w-full object-cover"
                        />
                    </div>
                </div>


                <div className="flex flex-col justify-center order-3 md:order-4">
                    <span className="text-sm text-gray-500 mb-2">About us</span>
                    <h3 className="text-2xl font-bold text-secondary mb-4">Our Vision</h3>
                    <p className="text-gray-600 mb-4">
                        To create a world where every elderly person lives with joy, security, and connection.
                    </p>
                    <p className="text-gray-600 mb-6">
                        We're driven to bridge the gap between generations and promote awareness about senior well-being.
                    </p>
                    <button className="border border-primary text-secondary px-6 py-2 rounded hover:bg-primary hover:text-white transition">
                        Learn More &gt;
                    </button>
                </div>

            </div>
        </section>
    );
};

export default MissionVision;
