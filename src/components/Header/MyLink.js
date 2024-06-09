import React from 'react';
import { Link } from 'react-router-dom';

const MyLink = ({ link, title }) => {
  return (
    <Link to={link} className="text-own-dark font-semibold uppercase text-sm">
      {title}
    </Link>
  );
};

export default MyLink;
