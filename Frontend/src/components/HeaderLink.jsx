import React from "react";
import { Link } from "react-router-dom";

const HeaderLink = ({ to, children, isLinkActive }) => {
  const linkClasses = `h-full flex items-center relative ${
    isLinkActive(to)
      ? "text-redText"
      : "font-semibold text-greyHeader text-opacity-80 text-xs"
  }`;

  return (
    <Link to={to}>
      <div className={linkClasses}>
        <span>{children}</span>
        <div
          className={`h-0.5 absolute bottom-0 left-0 bg-redText transition-all duration-300 ${
            isLinkActive(to) ? "w-full" : "w-0"
          }`}
        ></div>
      </div>
    </Link>
  );
};

export default HeaderLink;
