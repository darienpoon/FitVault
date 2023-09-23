import React from 'react';

const AboutUs = ({onAbout}) => {

   return onAbout ? (
    <div>
      <h3>About Us Page Content</h3>
    </div>
  ) : 'null';
};

export default AboutUs;