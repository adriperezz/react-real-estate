import React from 'react';
import Header from './components/Header/Header';
import Home from './Pages/Home';
import { Routes, Route } from 'react-router-dom';
import House from './Pages/House';
//import ListHomes from './Pages/ListHomes';
import Footer from './components/Footer/Footer';
import LikedHomes from './Pages/LikedHomes';
const LazyList = React.lazy(() => import('./Pages/ListHomes'));

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/buy"
          element={
            <React.Suspense fallback="Loading...">
              <LazyList type="sell" />
            </React.Suspense>
          }
        />
        <Route
          path="/rent"
          element={
            <React.Suspense fallback="Loading...">
              <LazyList type="rent" />
            </React.Suspense>
          }
        />
        <Route
          path="/sold"
          element={
            <React.Suspense fallback="Loading...">
              <LazyList type="sold" />
            </React.Suspense>
          }
        />
        <Route path="/house/:ref" element={<House />} />
        <Route path="/liked-houses" element={<LikedHomes />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
