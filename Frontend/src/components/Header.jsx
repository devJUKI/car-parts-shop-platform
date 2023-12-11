import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { useAuth } from "../contexts/AuthProvider";
import HeaderLink from "./HeaderLink";

function Header() {
  const { authData, accessToken, login, logout } = useAuth();
  const [buttonText, setButtonText] = useState("Debug");

  useEffect(() => {
    if (authData) {
      setButtonText("Hello, " + authData.firstname);
    }
  }, [authData]);

  const onButtonHover = () => {
    setButtonText("Logout");
  };

  const onButtonExitHover = () => {
    if (authData) {
      setButtonText("Hello, " + authData.firstname);
    }
  };

  const location = useLocation();

  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white">
      <div className="flex h-16 shadow-md">
        <div className="flex justify-between mx-36 w-full font-semibold text-greyHeader text-opacity-80 text-xs items-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-12 w-auto" />
          </Link>
          <div className="flex h-full space-x-8">
            <HeaderLink to="/" isLinkActive={isLinkActive}>
              Home
            </HeaderLink>
            <HeaderLink to="/Shops" isLinkActive={isLinkActive}>
              Shops
            </HeaderLink>
            <HeaderLink to="/Contact" isLinkActive={isLinkActive}>
              Contact
            </HeaderLink>
          </div>
          <span to="/">
            <img src={Logo} alt="Logo" className="h-12 w-auto opacity-0" />
          </span>
          <div className="absolute right-36">
            {authData ? (
              <button
                onMouseEnter={onButtonHover}
                onMouseLeave={onButtonExitHover}
                onClick={logout}
                className="flex h-full items-center justify-end w-40"
              >
                {buttonText}
              </button>
            ) : (
              <Link
                to="Login"
                className={`flex h-16 items-center justify-end w-40 relative ${
                  isLinkActive("/Login") || isLinkActive("/Register")
                    ? "text-redText"
                    : ""
                }`}
              >
                Login
                <div
                  className={`h-0.5 absolute bottom-0 right-0 bg-red-500 transition-all duration-300 ${
                    isLinkActive("/Login") || isLinkActive("/Register")
                      ? "w-8"
                      : "w-0"
                  }`}
                ></div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
