import React, { useEffect, useState } from 'react';
import HouseCard from '../components/ListHomes/HouseCard';
import Loader from '../Layouts/Loader';
import Container from '../Layouts/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const LikedHomes = () => {
  const [likedHomes, setLikedHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addressDetails, setAddressDetails] = useState([]);

  const getLocalHomes = () => {
    const liked = JSON.parse(localStorage.getItem('likedHomes'));
    setLikedHomes(liked);
  };

  useEffect(() => {
    getLocalHomes();
    getData();
  }, []);

  const getData = async () => {
    try {
      const apiAddressDetails = await fetch(
        'http://127.0.0.1:8000/api/house-address/list/'
      );
      if (apiAddressDetails.ok) {
        const dataAddressDetails = await apiAddressDetails.json();
        setAddressDetails(dataAddressDetails);
      } else {
        throw new Error('Failed to fetch address details');
      }
    } catch (error) {
      console.error(error);
    } finally {
      // Simulamos un tiempo de carga de antes de establecer loading en false
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer); // Limpiamos el temporizador cuando se desmonta el componente
    }
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <Container bgColor={'bg-own-light'}>
          {likedHomes.length > 0 ? (
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
              {likedHomes.map((house) => (
                <HouseCard
                  house={house}
                  key={house.id}
                  details={addressDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center font-mono text-2xl lg:text-5xl p-20">
              <div className="w-28 mx-auto mb-12">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                </svg>
              </div>
              <p>No liked houses! :&#40;</p>
              <div className="flex w-1/3 mx-auto text-base justify-center gap-10 text-neutral-500 underline mt-16">
                <Link to="/buy">
                  <p>Buy</p>
                </Link>
                <Link to="/sell">
                  <p>Sell</p>
                </Link>
              </div>
            </div>
          )}
        </Container>
      </>
    );
  }
};

export default LikedHomes;
