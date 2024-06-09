import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faShower,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const HouseCard = ({ house, details }) => {
  const [addressDetails, setAddressDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (details !== null) {
      const address = details.find((addr) => addr.id === house.address);
      setAddressDetails(address);
    }
  }, [house.address, details]);

  let style = {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    useGrouping: true,
  };

  var formatter = new Intl.NumberFormat('de-DE', style);
  const price = formatter.format(house.price);
  const backendUrl = 'http://localhost:8000';
  const mainPhotoUrl = `${backendUrl}/static/uploads/realEstate/housesPhotos/${house.reference}/0_mainPhoto.jpg`;

  //https://cdn.maklarhuset.se/employee/images/large/0ad8df08-c67d-4452-819a-28c03fb732d4.jpg

  return (
    <Link to={`/house/${house.reference}`}>
      <div className="bg-white border h-full border-stone-300 shadow-md text-own-dark overflow-hidden flex flex-col">
        <div
          className={`h-60 bg-cover bg-center`}
          style={{ backgroundImage: `url(${mainPhotoUrl})` }}
        ></div>

        <div className="py-5 px-2 border-y border-y-stone-300 flex-auto flex flex-col justify-between">
          <div>
            {addressDetails && (
              <p className="text-own-brown-gray text-xs">
                {`${addressDetails.localidad}, ${addressDetails.province}, ${addressDetails.country}`}
              </p>
            )}
            <p className="font-mono text-base py-2">{house.name}</p>
          </div>

          <div className="flex justify-start space-x-8 text-sm text-own-medium-dark font-bold items-end mt-auto">
            <div className="flex items-center space-x-2 ">
              <FontAwesomeIcon icon={faBed} />
              <p className="font-light">{house.numBedrooms}</p>
            </div>
            <div className="flex items-center space-x-2 ">
              <FontAwesomeIcon icon={faShower} />
              <p className="font-light">{house.numBathrooms}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faVectorSquare} />
              <p className="font-light">{`${house.metrosUtiles}/${house.metrosConstruidos}`}</p>
            </div>
          </div>
        </div>
        <div className="flex grow-0 justify-between px-2 py-3 items-center">
          <p className="text-lg font-light">{price}</p>
          <p className="text-xs text-own-brown-gray">{`REF: ${house.reference}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default HouseCard;
