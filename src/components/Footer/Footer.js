import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-own-light py-8 border-t border-black border-opacity-10 ">
      <div className="container mx-auto px-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 content-center ">
          <div className="col-span-1 text-center lg:text-right">
            <h2 className="text-lg font-semibold text-neutral-500 mb-4">
              Contact Us
            </h2>
            <p className="text-sm text-own-brown-gray">123 Street Name</p>
            <p className="text-sm text-own-brown-gray">City, Country</p>
            <p className="text-sm text-own-brown-gray">
              Email: info@example.com
            </p>
            <p className="text-sm text-own-brown-gray">Phone: +1234567890</p>
          </div>
          <div className="col-span-1 mx-auto">
            <img
              src="/real_logo.svg"
              alt="Maklarhuset Coffee Color Logo"
              className="h-24 w-24 min-w-14 min-h-14"
            ></img>
          </div>
          <div className="col-span-1 text-center lg:text-left">
            <h2 className="text-lg font-semibold text-neutral-500 mb-4">
              Social Media
            </h2>
            <div className="flex justify-center lg:justify-start space-x-4">
              <a
                href="#"
                className="text-sm text-own-brown-gray hover:text-own-dark-brown"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-sm text-own-brown-gray hover:text-own-dark-brown"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-sm text-own-brown-gray hover:text-own-dark-brown"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-sm text-center text-own-brown-gray">
          &copy; {new Date().getFullYear()} My Real Estate App. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
