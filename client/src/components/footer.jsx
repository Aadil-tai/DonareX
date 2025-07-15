import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-secondary text-white py-10 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">


                <div>
                    <Link to="/" className="text-2xl font-bold mb-4 inline-block">
                        <span className="text-white">Give</span>
                        <span className="text-primary">Life</span>
                    </Link>
                    <p className="text-sm mt-2">
                        Bringing hope and support to those who need it most.
                    </p>
                    <div className="flex gap-3 mt-4 text-white">
                        <a href="#" className="hover:text-primary"><FaFacebookF /></a>
                        <a href="#" className="hover:text-primary"><FaTwitter /></a>
                        <a href="#" className="hover:text-primary"><FaInstagram /></a>
                        <a href="#" className="hover:text-primary"><FaLinkedinIn /></a>
                    </div>
                </div>


                <div>
                    <h4 className="font-semibold mb-4">Quick Links</h4>
                    <ul className="text-sm space-y-2">
                        <li><Link to="/" className="hover:text-primary">Home</Link></li>
                        <li><Link to="/about" className="hover:text-primary">About</Link></li>
                        <li><Link to="/donate" className="hover:text-primary">Donate</Link></li>
                        <li><Link to="/env" className="hover:text-primary">Contact</Link></li>
                    </ul>
                </div>


                <div>
                    <h4 className="font-semibold mb-4">Our Services</h4>
                    <ul className="text-sm space-y-2">
                        <li>Health Aid</li>
                        <li>Food Distribution</li>
                        <li>Senior Support</li>
                        <li>Emergency Help</li>
                    </ul>
                </div>


                <div>
                    <h4 className="font-semibold mb-4">Contact</h4>
                    <p className="text-sm">Phone: +91 98765 43210</p>
                    <p className="text-sm">Email: support@givelife.org</p>
                    <p className="text-sm">Address: Mumbai, India</p>
                </div>
            </div>


            <div className="text-center text-xs text-gray-300 mt-10">
                © {new Date().getFullYear()} GiveLife. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
