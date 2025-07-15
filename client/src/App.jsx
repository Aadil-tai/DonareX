import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Herosection from './components/Herosection';
import Header from './components/Header';
import Home from './pages/Home';
import Donate from './pages/Donate';
import Footer from './components/footer';
import { ToastContainer } from 'react-toastify';

// Dummy components for demo pages
const About = () => <div className="p-10 text-white bg-gray-900 h-screen">About Page</div>;
const NotFound = () => <div className="p-10 text-red-500">404 - Page Not Found</div>;

const App = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={5000} />

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="*" element={<NotFound />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
