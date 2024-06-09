import React from 'react';
import Header from './components/Header/Header';
import Home from './Pages/Home';
import { Routes, Route } from 'react-router-dom';
import House from './Pages/House';
import ListHomes from './Pages/ListHomes';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<ListHomes type="sell" />} />
        <Route path="/rent" element={<ListHomes type="rent" />} />
        <Route path="/sold" element={<ListHomes type="sold" />} />
        <Route path="/house/:ref" element={<House />} />
      </Routes>
    </>
  );
};

export default App;
