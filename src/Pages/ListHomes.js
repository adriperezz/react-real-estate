import React, { useEffect, useState } from 'react';
import Container from '../Layouts/Container';
import HouseCard from '../components/ListHomes/HouseCard';
import Loader from '../Layouts/Loader';
import PriceSlider from '../components/House/PriceSlider';
import { createTheme } from '@mui/material';
import SelectedLocation from '../components/House/SelectLocation';
import { ThemeProvider } from '@mui/material/styles';
import SelecType from '../components/House/SelecType';

const ListHomes = ({ type }) => {
  const [houses, setHouses] = useState([]);
  const [addressDetails, setAddressDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [houseType, setHouseType] = useState('all');

  //Slider theme customization
  const theme = createTheme({
    palette: {
      primary: {
        main: '#776552',
        light: '#E8E4DE',
      },
      focusRingColor: '#776552',
    },
  });

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

        const prices = dataHouses.map((house) => house.price);
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));
        setPriceRange([Math.min(...prices), Math.max(...prices)]);
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

  const handlePriceChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  const handleSelectedLocationChange = (value) => {
    setSelectedLocation(value);
  };

  const handleTypeChange = (value) => {
    setHouseType(value);
  };

  const getProvinceByHouseId = (addressId) => {
    const address = addressDetails.find((add) => add.id === addressId);
    return address ? address.province : '';
  };

  const filteredProvinces = [
    ...new Set(
      houses
        .filter((house) => house.typeBusiness === type)
        .map((house) => getProvinceByHouseId(house.address))
    ),
  ];

  if (loading) {
    return <Loader />;
  } else {
    //Filtramos las casas por tipo de negocio, rango de precios, provincia seleccionada
    const filteredHouses = houses
      .filter((house) => house.typeBusiness === type)
      .filter(
        (house) => house.price >= priceRange[0] && house.price <= priceRange[1]
      )
      .filter((house) => {
        const province = getProvinceByHouseId(house.address);
        return selectedLocation === 'all' || province === selectedLocation;
      })
      .filter((house) => house.typeHouse === houseType || houseType === 'all');
    return (
      <>
        <Container bgColor={'bg-own-light'}>
          <ThemeProvider theme={theme}>
            <div>
              <SelecType onChange={handleTypeChange} />
            </div>
            <div>
              <SelectedLocation
                onSelectChange={handleSelectedLocationChange}
                provinces={filteredProvinces}
                theme={theme}
              />
            </div>
            <div>
              <PriceSlider
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={handlePriceChange}
              />
            </div>
          </ThemeProvider>
          <div className="grid lg:grid-cols-3 gap-5">
            {filteredHouses.map((house) => (
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
