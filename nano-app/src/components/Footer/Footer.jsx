import "./Footer.css";
import React from "react";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 384 512"><path fill="#B197FC" d="M374.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-320 320c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l320-320zM128 128A64 64 0 1 0 0 128a64 64 0 1 0 128 0zM384 384a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" /></svg>
                <h1 className="footer-logo-text">Nano</h1>
            </div>
            <div className="footer-text">
                <p>Nano: Your streamlined banking solution. With effortless money management, lightning-fast fund transfers, and 24/7 account access, Nano puts you in control of your finances, wherever you are.</p>
            </div>        
        </div>
    )
}

export default Footer;