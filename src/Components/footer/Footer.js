import React from 'react';
import './Footer.css'; // Import your CSS file for styling

const Footer = () => {
  return (
    <footer className="footer-container">
      
      

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Arij Zitouni. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
