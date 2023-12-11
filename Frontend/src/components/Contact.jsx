import React from "react";
import { Link } from "react-router-dom";
import Background from "../assets/background.png";

function Contact() {
  return (
    <>
      <div className="flex absolute h-full w-full">
        <div className="flex items-center w-full">
          <div className="bg-greyBody h-full items-center flex flex-1 w-full">
            {/* shadow-[rgba(0,0,15,0.25)_4px_0px_4px_2px] */}
            <div className="mx-36 space-y-12">
              <div className="text-4xl text-greyHeader font-bold">
                <p>
                  Have a <span className="text-redText">problem</span>?
                </p>
                <span className="text-redText"> Contact </span> us
              </div>
              <div className="space-y-3">
                <div className="text-left">
                  <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
                    Your name
                  </p>
                  <input
                    type="text"
                    className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                  />
                </div>
                <div className="text-left">
                  <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
                    Your email
                  </p>
                  <input
                    type="text"
                    className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                  />
                </div>
                <div className="text-left">
                  <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
                    Your message
                  </p>
                  <input
                    type="text"
                    className="w-full h-24 rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                  />
                </div>
                <Link className="border text-sm py-2 rounded-lg text-white bg-redText font-semibold flex w-full justify-center">
                  <div className="space-x-2 flex items-center">
                    <span>Send</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-2 h-full bg-red-200">
            <img src={Background} className="object-cover max-w-5xl" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
