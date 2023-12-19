import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p style={{ fontSize: "10px" }}>
          Download App for Android and IOS mobile phone
        </p>
      </div>

      <div className="midFooter">
        <h1>ChatBuddy</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2021 &copy; NaveenSingh</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/naveenSingh">Instagram</a>
        <a href="http://youtube.com/CodeHub">Youtube</a>
        <a href="http://instagram.com/naveenSingh">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
