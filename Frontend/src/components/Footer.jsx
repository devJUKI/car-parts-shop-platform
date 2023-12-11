import React from "react";
import { Link } from "react-router-dom";
import FooterLogo from "../assets/footerLogo.svg";

function Footer() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white">
      <div className="flex h-16 shadow-md">
        <div className="flex space-x-8 mx-36 w-full font-semibold text-greyHeader text-opacity-80 text-xs items-center">
          <Link to="/">
            <img src={FooterLogo} alt="footerLogo" className="h-12 w-auto" />
          </Link>
          <div className="space-x-4 font-semibold text-greyHeader text-opacity-60">
            <Link>F.A.Q.</Link>
            <Link>Terms of Service</Link>
            <Link>Privacy Policy</Link>
          </div>
        </div>
      </div>
      <div className="w-full h-0.5 absolute top-0 left-0 bg-gray-200" />
    </nav>
  );
}

export default Footer;
