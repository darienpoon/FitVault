import React from 'react';
import { FaInfoCircle, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AboutUs from './NavComponents/AboutUs.jsx';
import MyAccount from './NavComponents/MyAccount.jsx';


const NavigationBar = ({handleAboutClick}) => {
  return (
    <div className="navigation-container">
      <Link to="/about" className="nav-link" onClick={handleAboutClick}>
        <FaInfoCircle size={20} />
        <span className="nav-text">ABOUT US</span>
      </Link>
      <Link to="/myaccount" className="nav-link">
        <FaSignInAlt size={20} />
        <span className="nav-text">MY ACCOUNT</span>
      </Link>
    </div>
  );
};



export default NavigationBar;