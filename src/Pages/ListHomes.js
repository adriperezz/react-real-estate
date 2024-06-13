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
import Search from '../components/ListHomes/Filters/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

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
  const [searchValue, setSearchValue] = useState('');

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
    handlePopupClosed();
  };

  const handleSelectedLocationChange = (value) => {
    setSelectedLocation(value);
    handlePopupClosed();
  };

  const handleTypeChange = (value) => {
    setHouseType(value);
    handlePopupClosed();
  };

  const handleAreaSubmit = (areaValues) => {
    setAreaRange(areaValues);
    handlePopupClosed();
  };

  const handleHabRangeSubmit = (habValues) => {
    setHabRange(habValues);
    handlePopupClosed();
  };

  const handleBathRangeSubmit = (bathValues) => {
    setBathRange(bathValues);
    handlePopupClosed();
  };

  const handlePopupOpened = () => {
    setIsFilterPopupOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handlePopupClosed = () => {
    setIsFilterPopupOpen(false);
    document.body.style.overflow = 'visible';
  };

  const handleSearchSubmit = (searchValue) => {
    setSearchValue(searchValue);
  };

  const getHouseAddress = (house) => {
    const address = addressDetails.find((add) => add.id === house.address);
    return address ? address : null;
  };

  const filteredProvinces = [
    ...new Set(
      houses
        .filter((house) => house.typeBusiness === type)
        .map((house) => getHouseAddress(house)?.province)
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
        if (selectedLocation === '' || selectedLocation === 'all') {
          return true; // Si la ubicación seleccionada es vacía o 'all', retorna true para incluir la casa
        } else {
          // Obtener la provincia a partir de la dirección de la casa
          const province = getHouseAddress(house)?.province;

          // Compara la provincia obtenida con la ubicación seleccionada
          return province === selectedLocation;
        }
      })
      .filter(
        (house) =>
          house.typeHouse === houseType ||
          houseType === 'all' ||
          houseType === ''
      )
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
      )
      .filter((house) => {
        const lowerSearch = searchValue.toLowerCase().trim();
        const houseReferenceLower = house.reference.toLowerCase();
        const houseNameLower = house.name.toLowerCase();
        const address = getHouseAddress(house);
        const addressStreetLower = address?.street.toLowerCase() || '';
        const addressLocalidadLower = address?.localidad.toLowerCase() || '';
        const addressProvinceLower = address?.province.toLowerCase() || '';
        const addressZipCodeLower = '' + address?.zipCode || '';

        return (
          houseReferenceLower.includes(lowerSearch) ||
          houseNameLower.includes(lowerSearch) ||
          addressStreetLower.includes(lowerSearch) ||
          addressProvinceLower.includes(lowerSearch) ||
          addressZipCodeLower.includes(lowerSearch) ||
          addressLocalidadLower.includes(lowerSearch)
        );
      });

    return (
      <>
        {isFilterPopupOpen && (
          <ThemeProvider theme={theme}>
            <div className="fixed top-0 left-0 right-0 h-screen w-full content-center justify-center lg:hidden border border-neutral-300 bg-white p-4 space-y-4 px-8 py-10 lg:sticky lg:top-10">
              <div className="absolute top-10 right-10">
                <button
                  type="button"
                  onClick={handlePopupClosed}
                  class="bg-white p-2 inline-flex items-center justify-center text-own-brown-gray hover:text-own-brown-gray hover:bg-own-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span class="sr-only">Close menu</span>

                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="pb-2">
                <SelecType onChange={handleTypeChange} />
              </div>
              <div className="pb-2">
                <SelectedLocation
                  onSelectChange={handleSelectedLocationChange}
                  provinces={filteredProvinces}
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
        )}

        <Container bgColor={'bg-own-light'}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full h-full">
            {/* Parte A: Filtros */}
            <div className="col-span-1 space-y-4 w-full h-full">
              <ThemeProvider theme={theme}>
                <div className="hidden lg:block border border-neutral-300 bg-white p-4 space-y-4 px-8 py-14 lg:sticky lg:top-10">
                  <div className="pb-2">
                    <Search onSubmit={handleSearchSubmit} hidden={'hidden'} />
                  </div>
                  <div className="pb-2">
                    <SelecType onChange={handleTypeChange} />
                  </div>
                  <div className="pb-2">
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

            <div className="lg:hidden col-span-1 h-full">
              <div className="flex w-full justify-between items-end h-full">
                <div className="w-3/4 h-full">
                  <Search onSubmit={handleSearchSubmit} />
                </div>
                <div className="h-full w-1/4 flex items-end">
                  <button
                    onClick={handlePopupOpened}
                    className="w-full h-1/2 flex justify-center items-center max-h-1/2 min-h-1/2 bg-own-dark text-sm font-semibold leading-6 text-white shadow-sm hover:bg-own-brown-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-own-dark"
                  >
                    <FontAwesomeIcon icon={faFilter} />
                  </button>
                </div>
              </div>
            </div>

            {/* Parte B: Lista de casas */}
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full h-fit">
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
