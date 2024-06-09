import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import Container from '../Layouts/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import ContactForm from '../components/Form/ContactForm';
import GridFeatures from '../components/House/GridFeatures';
import FeatureBadge from '../components/House/FeatureBadge';
import Moment from 'react-moment';
import CarouselPhotos from '../components/House/CarouselPhotos';
import TextWithToggle from '../components/TextWithToggle';

const House = () => {
  const { ref } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addressDetails, setAddressDetails] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [price, setPrice] = useState(null);
  const [agent, setAgent] = useState(null);

  let style = {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    useGrouping: true,
  };

  useEffect(() => {
    const getData = async () => {
      try {
        console.log('Fetching house details');
        const [apiHouse, apiAddressDetails] = await Promise.all([
          fetch(`http://localhost:8000/api/houses/detail/${ref}`),
          fetch('http://127.0.0.1:8000/api/house-address/list/'),
        ]);

        if (!apiHouse.ok) {
          throw new Error('Failed to fetch houses');
        }
        if (!apiAddressDetails.ok) {
          throw new Error('Failed to fetch address details');
        }

        const dataHouse = await apiHouse.json();
        const dataAddressDetails = await apiAddressDetails.json();

        setHouse(dataHouse);

        const address = dataAddressDetails.find(
          (addr) => addr.id === dataHouse.address
        );
        setAddressDetails(address);

        console.log('Fetching photos and agent details');
        const [apiPhotos, apiAgent] = await Promise.all([
          fetch(`http://localhost:8000/api/image-houses/house/${dataHouse.id}`),
          fetch(`http://localhost:8000/api/agents/detail/${dataHouse.agent}`),
        ]);

        if (!apiPhotos.ok) {
          throw new Error('Failed to fetch photos');
        }
        if (!apiAgent.ok) {
          throw new Error('Failed to fetch agent');
        }

        const dataPhotos = await apiPhotos.json();
        const dataAgent = await apiAgent.json();
        setPhotos(dataPhotos);
        setAgent(dataAgent);

        var formatter = new Intl.NumberFormat('de-DE', style);
        setPrice(formatter.format(dataHouse.price));
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [ref]);

  const backendUrl = 'http://localhost:8000';
  const texto =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem iure culpa fuga fugiat nemo nisi non, dolor doloribus eaque obcaecati facilis. Nulla nemo, molestias, dignissimos inventore quo id eos culpa eaque suscipit esse voluptates. Nesciunt placeat sint tempora eaque omnis eligendi explicabo amet, eius laudantium dignissimos expedita nulla porro quia architecto ipsa consequatur officiis velit, minus maiores facere, numquam praesentium magni at ea! Voluptatum ipsa dolores, nemo pariatur aperiam quidem repudiandae blanditiis iure commodi deserunt itaque ipsam eos ratione aliquam magni distinctio provident neque, natus corrupti a hic magnam exercitationem. Ipsum possimus temporibus facere voluptates fugiat, nobis commodi debitis. Magni ratione ipsum recusandae quasi doloribus ad veritatis explicabo. Ab dolores sunt ea soluta, magni voluptatum veritatis. Dolore omnis sapiente atque!';
  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="relative w-full">
          {photos.length !== 0 && <CarouselPhotos photos={photos} />}
          <div className="relative w-full">
            <Container>
              <div className="lg:w-3/5">
                <div>
                  <div className="space-y-4 border-b pb-6 border-own-light">
                    <h2 className="text-xl text-own-dark font-mono">{`${house.name} - ${addressDetails.localidad}, ${addressDetails.province}, ${addressDetails.country}`}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 text-own-dark gap-4">
                      <div>
                        <p className="font-light text-sm text-own-brown-gray">
                          Price
                        </p>
                        <p className="text-xl font-normal mt-1">{price}</p>
                      </div>
                      <div>
                        <p className="font-light text-sm text-own-brown-gray">
                          Bedrooms
                        </p>
                        <p className="text-xl font-normal mt-1">
                          {house.numBedrooms}
                        </p>
                      </div>
                      <div>
                        <p className="font-light text-sm text-own-brown-gray">
                          Bathrooms
                        </p>
                        <p className="text-xl font-normal mt-1">
                          {house.numBathrooms}
                        </p>
                      </div>
                      <div>
                        <p className="font-light text-sm text-own-brown-gray">
                          Area
                        </p>
                        <p className="text-xl font-normal mt-1">{`${house.metrosUtiles}/${house.metrosConstruidos}`}</p>
                      </div>
                    </div>
                    <div className="flex text-neutral-400 text-xs font-light gap-5">
                      <div className="pr-5 border-r border-own-light">
                        <p>{`REF: ${house.reference}`}</p>
                      </div>
                      <div>
                        <p>
                          Published Date:{' '}
                          <Moment format="DD-MM-YYYY">
                            {house.publishedDate}
                          </Moment>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
            <Container>
              <div className="lg:w-3/5 p-4">
                <div>
                  <div>
                    <h2 className="text-own-dark text-xl font-mono mb-4">
                      Special Features
                    </h2>
                    <p>{house.description}</p>
                    <TextWithToggle text={texto} maxWords={50} />
                  </div>
                </div>
              </div>
            </Container>
            <div className="h-full lg:w-1/4 lg:absolute md:top-4 rigth-0 md:right-10 xl:right-24">
              <div className="lg:sticky lg:top-10 xl:w-full space-y-6 py-10 px-8 border border-own-light bg-white">
                <div className="flex h-full items-center space-x-4">
                  <div
                    className={`w-24 h-24 xl:w-28 xl:h-28 bg-cover bg-top rounded-full`}
                    style={{
                      backgroundImage: `url(${backendUrl}${agent.photo})`,
                    }}
                  ></div>
                  <div>
                    <p className="text-lg xl:text-xl text-own-dark">{`${agent.name} ${agent.lastname}`}</p>
                    <p className="capitalize text-xs xl:text-sm text-own-brown-gray">
                      {agent.rol}
                    </p>
                    <div className="flex items-center space-x-2 mt-4 text-sm text-neutral-600">
                      <FontAwesomeIcon icon={faPhone} />
                      <p className="text-xs">{agent.phone}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-1 text-sm text-neutral-600">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <p className="text-xs">{agent.email}</p>
                    </div>
                  </div>
                </div>
                <ContactForm house={house} />
              </div>
            </div>
            <Container bgColor={'bg-own-light'}>
              <div className="lg:w-3/4 p-8">
                <div className="lg:w-3/4">
                  <div>
                    <div className="space-y-3 border-b border-neutral-300 pb-8">
                      <h2 className="text-sm font-mono text-neutral-500">
                        Property Type
                      </h2>
                      <p className="capitalize text-2xl text-neutral-700">
                        {house.typeHouse}
                      </p>
                    </div>
                  </div>
                  <div className="mt-10">
                    <GridFeatures
                      p1="Rooms"
                      p2={house.numBedrooms}
                      capitalize="capitalize"
                    />
                    <GridFeatures
                      p1="Bedrooms"
                      p2={house.numBathrooms}
                      capitalize="capitalize"
                    />
                    <GridFeatures
                      p1="Living area"
                      p2={`${house.metrosUtiles} m2`}
                    />
                    <GridFeatures
                      p1="Plot surface"
                      p2={`${house.metrosConstruidos} m2`}
                    />
                    <GridFeatures
                      p1="State"
                      p2={house.state}
                      capitalize="capitalize"
                    />
                    {house.floor !== 'none' && (
                      <GridFeatures
                        p1="Floor"
                        p2={house.floor}
                        capitalize="capitalize"
                      />
                    )}
                  </div>
                  <div className="mt-10">
                    <div className="space-y-3">
                      <h2 className="text-sm font-mono text-neutral-500">
                        Features
                      </h2>
                      <div className="flex flex-wrap gap-3 capitalize">
                        {house.caracteristicas.map((caracteristic) => (
                          <FeatureBadge
                            feature={caracteristic}
                            key={caracteristic.id}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </>
    );
  }
};

export default House;
