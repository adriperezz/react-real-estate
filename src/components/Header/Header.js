import React from 'react';
import MyLink from './MyLink';
import { menuData } from '../../data';
import { Link } from 'react-router-dom';
const data = menuData;

const Header = () => {
  return (
    <header className="bg-own-light">
      <nav className="mx-auto max-w-7xl p-3 lg:px-8">
        <div className="flex justify-between items-center gap-10 px-8">
          <div className="">
            <Link to="/">
              <img
                src="/real_logo.svg"
                alt="Maklarhuset Coffee Color Logo"
                className="h-24 w-24 min-w-14 min-h-14"
              ></img>
            </Link>
          </div>
          <div className="flex justify-between space-x-8 items-center">
            {data
              .filter((item) => item.seen)
              .map((item, index) => {
                return (
                  <MyLink key={index} link={item.link} title={item.title} />
                );
              })}
          </div>
          <div className="flex flex-none justify-between items-center space-x-4">
            <Link to="/liked-houses">
              <img
                src="/heart-icon.svg"
                alt="Liked Houses Logo"
                className="h-5 w-auto"
              />
            </Link>
            <Link to="/log-in">
              <img
                src="/user-solid.svg"
                alt="User Logo"
                className="h-5 w-auto"
              />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
