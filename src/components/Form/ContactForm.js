import React from 'react';

const ContactForm = ({ house }) => {
  const clase =
    'block text-xs w-full border-0 py-2 px-2 text-neutral-600 shadow-sm ring-1 ring-inset ring-own-light placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-own-dark sm:leading-6';
  return (
    <>
      <form className="space-y-6" action="#" method="POST">
        <div>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Full Name"
              required
              className={clase}
            />
          </div>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              required
              className={clase}
            />
          </div>
          <div className="mt-2">
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Phone Number"
              required
              className={clase}
            />
          </div>
          <div className="mt-2">
            <input
              id="houseReference"
              name="houseReference"
              type="text"
              value={house.reference}
              className={`${clase} text-stone-400 disabled:bg-slate-50`}
              disabled
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center bg-own-dark py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-own-brown-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-own-dark"
          >
            Contact Agent
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
