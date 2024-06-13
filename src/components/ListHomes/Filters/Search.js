import React, { useState } from 'react';

const Search = ({ onSubmit, hidden }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(searchValue);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const clase =
    'block text-xs w-full border-0 py-2 px-2 text-neutral-600 shadow-sm ring-1 ring-inset ring-own-light placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-own-dark';

  return (
    <>
      <div className={`${hidden} lg:block`}>
        <label className="block text-sm font-light leading-6 text-own-brown-gray">
          Search
        </label>
        <div className="w-full h-full mt-2 shadow-sm">
          <form action="submit" onSubmit={handleSubmit}>
            <input
              type="text"
              name="search"
              id="search"
              className={clase}
              placeholder="Address or Real Estate ID"
              value={searchValue}
              onChange={handleChange}
            />
            <button type="submit" className="hidden"></button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Search;
