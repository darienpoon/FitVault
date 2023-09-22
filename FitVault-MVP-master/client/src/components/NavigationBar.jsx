import React from 'react';
import { FaInfoCircle, FaSignInAlt } from 'react-icons/fa';

const NavigationBar = () => {
  return (
    <>
      <div>
        <FaInfoCircle size={20} /> {/* Adjust the size as needed */}
        <span>ABOUT US</span>
      </div>
      <div>
        <FaSignInAlt size={20} /> {/* Adjust the size as needed */}
        <span>LOG IN</span>
      </div>
    </>
  );
};


export default NavigationBar;