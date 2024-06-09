import React, { useEffect, useState } from 'react';
import Container from '../Layouts/Container';
import HouseCard from '../components/ListHomes/HouseCard';
import Loader from '../Layouts/Loader';

const ListHomes = ({ type }) => {
  const [houses, setHouses] = useState([]);
  const [addressDetails, setAddressDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const apiHouses = await fetch('http://127.0.0.1:8000/api/houses/list/');
      const apiAddressDetails = await fetch(
        'http://127.0.0.1:8000/api/house-address/list/'
      );
      if (apiHouses.ok) {
        const dataHouses = await apiHouses.json();
        setHouses(dataHouses);
      } else {
        throw new Error('Failed to fetch houses');
      }
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
          <div className="grid lg:grid-cols-3 gap-5">
            {houses
              .filter((house) => house.typeBusiness === type)
              .map((house) => (
                <HouseCard
                  house={house}
                  key={house.id}
                  details={addressDetails}
                />
              ))}
          </div>
        </Container>
      </>
    );
  }
};

export default ListHomes;
