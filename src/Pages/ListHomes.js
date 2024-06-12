import React, { useEffect, useState } from 'react';
import Container from '../Layouts/Container';
import HouseCard from '../components/ListHomes/HouseCard';
import Loader from '../Layouts/Loader';
import PriceSlider from '../components/ListHomes/Filters/PriceSlider';
import { createTheme } from '@mui/material';
import SelectedLocation from '../components/ListHomes/Filters/SelectLocation';
import { ThemeProvider } from '@mui/material/styles';
import SelecType from '../components/ListHomes/Filters/SelecType';
import AreaRange from '../components/ListHomes/Filters/AreaRange';
import HabRange from '../components/ListHomes/Filters/HabRange';

const ListHomes = ({ type }) => {
  const [houses, setHouses] = useState([]);
  const [addressDetails, setAddressDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [houseType, setHouseType] = useState('all');
  const [areaRange, setAreaRange] = useState(['', '']);
  const [habRange, setHabRange] = useState(['', '']);
  const [bathRange, setBathRange] = useState(['', '']);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

  //Slider theme customization
  const theme = createTheme({
    palette: {
      primary: {
        main: '#776552',
        light: '#E8E4DE',
      },
    },
    typography: {
      fontFamily: [
        'ui-sans-serif',
        'system-ui',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ].join(','),
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

  const handleAreaSubmit = (areaValues) => {
    setAreaRange(areaValues);
  };

  const handleHabRangeSubmit = (habValues) => {
    setHabRange(habValues);
  };

  const handleBathRangeSubmit = (bathValues) => {
    setBathRange(bathValues);
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
    //Filtramos las casas por tipo de negocio, rango de precios, provincia seleccionada, tipo de casa seleccionada
    const filteredHouses = houses
      .filter((house) => house.typeBusiness === type)
      .filter(
        (house) => house.price >= priceRange[0] && house.price <= priceRange[1]
      )
      .filter((house) => {
        const province = getProvinceByHouseId(house.address);
        return selectedLocation === 'all' || province === selectedLocation;
      })
      .filter((house) => house.typeHouse === houseType || houseType === 'all')
      .filter(
        (house) =>
          (house.metrosConstruidos >= areaRange[0] &&
            house.metrosConstruidos <= areaRange[1]) ||
          (areaRange[0] === '' && areaRange[1] === '')
      )
      .filter(
        (house) =>
          (house.numBedrooms >= habRange[0] &&
            house.numBedrooms <= habRange[1]) ||
          (habRange[0] === '' && habRange[1] === '')
      )
      .filter(
        (house) =>
          (house.numBathrooms >= bathRange[0] &&
            house.numBathrooms <= bathRange[1]) ||
          (bathRange[0] === '' && bathRange[1] === '')
      );

    return (
      <>
        <Container bgColor={'bg-own-light'}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
            {/* Parte A: Filtros */}
            <div className="col-span-1 space-y-4">
              <ThemeProvider theme={theme}>
                <div className="border border-neutral-300 bg-white p-4 space-y-4 px-8 py-10">
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
                    <label className="block text-sm font-light leading-6 text-own-brown-gray">
                      Price
                    </label>
                    <PriceSlider
                      minPrice={minPrice}
                      maxPrice={maxPrice}
                      onPriceChange={handlePriceChange}
                    />
                  </div>
                  <div>
                    <AreaRange onSubmit={handleAreaSubmit} />
                  </div>
                  <div>
                    <HabRange
                      onSubmit={handleHabRangeSubmit}
                      min={'min'}
                      max={'max'}
                      title={'Bedrooms'}
                    />
                  </div>
                  <div>
                    <HabRange
                      onSubmit={handleBathRangeSubmit}
                      min={'min'}
                      max={'max'}
                      title={'Bathrooms'}
                    />
                  </div>
                </div>
              </ThemeProvider>
            </div>

            <div className="lg:hidden col-span-1">
              <button
                onClick={() => setIsFilterPopupOpen(true)}
                className="w-full bg-own-dark py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-own-brown-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-own-dark"
              >
                Open Filters
              </button>
            </div>

            {/* Parte B: Lista de casas */}
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
              {filteredHouses.map((house) => (
                <HouseCard
                  house={house}
                  key={house.id}
                  details={addressDetails}
                />
              ))}
            </div>
          </div>
        </Container>
      </>
    );
  }
};

export default ListHomes;

/*<Container bgColor={'bg-own-light'}>
  <div className="relative w-full">
    <div className="flex justify-between w-full mx-auto items-center border border-own-brown-gray divide-x divide-own-brown-gray mb-8 bg-white sticky top-0">
      <ThemeProvider theme={theme}>
        <div className="flex flex-col w-3/12 justify-center">
          <div className="flex justify-between items-center">
            <div className="pb-4 px-8 w-1/2">
              <SelecType onChange={handleTypeChange} />
            </div>
            <div className="pb-4 px-8 w-1/2">
              <SelectedLocation
                onSelectChange={handleSelectedLocationChange}
                provinces={filteredProvinces}
                theme={theme}
              />
            </div>
          </div>
          <div className="pt-2 px-8 border-t border-own-brown-gray ">
            <label className="block text-sm font-light leading-6 text-own-brown-gray">
              Price
            </label>
            <PriceSlider
              minPrice={minPrice}
              maxPrice={maxPrice}
              onPriceChange={handlePriceChange}
            />
          </div>
        </div>
      </ThemeProvider>
      <div className="py-6 px-8 w-3/12">
        <AreaRange onSubmit={handleAreaSubmit} />
      </div>
      <div className="py-6 px-8 w-3/12">
        <HabRange
          onSubmit={handleHabRangeSubmit}
          decoration={'bedroom/s'}
          title={'Bedrooms'}
        />
      </div>
      <div className="py-6 px-8 w-3/12">
        <HabRange
          onSubmit={handleBathRangeSubmit}
          decoration={'bathroom/s'}
          title={'Bathrooms'}
        />
      </div>
    </div>
  </div>
  <div className="grid lg:grid-cols-3 gap-5">
    {filteredHouses.map((house) => (
      <HouseCard house={house} key={house.id} details={addressDetails} />
    ))}
  </div>
</Container>;*/
