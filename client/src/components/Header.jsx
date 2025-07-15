import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import Marquee from './Marquee';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: "Home", id: "home" },
        { name: "About", id: "about" },
        { name: "Contact", id: "contact" },
    ]

    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (id) => {
        if (location.pathname !== "/") {
            navigate("/", { state: { scrollTarget: id } });

        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            <header className="sticky top-6 z-50 flex  justify-center">
                <div className=" w-[90%] md:max-w-6xl backdrop-blur-md bg-secondary border border-white/20 shadow-md rounded-full px-6 py-4 flex justify-between items-center transition-all">

                    <div className="lg:hidden">
                        <button onClick={toggleMenu} className="text-white text-2xl">
                            {isMobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
                        </button>
                    </div>
                    <ul className="lg:flex hidden  gap-6 text-sm font-medium text-white">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => scrollToSection(item.id)}
                                    className='hover:text-primary transition'
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <Link to="/" className="text-2xl font-bold text-white mx-auto md:mx-0">
                        <span className="text-white">Give</span>
                        <span className="text-primary">Life</span>
                    </Link>


                    <Link to="/donate" className="hidden md:block">
                        <button className="bg-primary hover:bg-white text-white hover:text-primary  px-5 py-2 rounded-full transition">
                            Donate
                        </button>
                    </Link>


                </div>


                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}>
                        <div
                            className="fixed top-0 right-0 w-64 h-[50%] bg-secondary text-white p-6 shadow-lg z-50 flex flex-col gap-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={toggleMenu} className="self-end text-2xl">
                                <HiOutlineX />
                            </button>
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        scrollToSection(item.id);
                                        setIsMobileMenuOpen(false); // close menu
                                    }}
                                    className="hover:text-primary text-left"
                                >
                                    {item.name}
                                </button>
                            ))}

                            <Link to="/donate" onClick={toggleMenu}>
                                <button className="bg-primary mt-4 w-full py-2 rounded-full">
                                    Donate
                                </button>
                            </Link>
                        </div>
                    </div>
                )}

            </header>
        </>
    );
};

export default Header;
