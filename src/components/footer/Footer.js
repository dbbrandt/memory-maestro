import React from "react";
import './Footer.css';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="container-grid layout-section footer">
      <h3 className="footer-text">Copyright 2019-2020 Precidix LLC. All rights reserved.</h3>
      <Link to="/privacy-policy">
        <div style={{marginLeft: 20}}>
          <h3>Privacy Policy</h3>
        </div>
      </Link>
    </footer>
  )
};

export default Footer;
