import JobPostingsContainer from './features/job-postings/JobPostingsContainer';
import './App.scss'
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import JobPost from './features/job-postings/JobPost';
import ContractorSearch from './features/contractors/ContractorSearch'
import ErrorPage from './features/ErrorPage';
import Contractor from './features/contractors/Contractor';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Library } from '@googlemaps/js-api-loader';
import secrets from './assets/secrets';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import WelcomePage from './features/welcome/WelcomePage';
import Loading from './features/loading/Loading';
import SystemMessageQueue from './features/system-message-queue/SystemMessageQueue';
import { setLocation } from './store/placeSlice';


function App() {

  const mapsLibrariesRef = useRef<Library[]>(['places']);
  const { hash, pathname } = useLocation();
  
  const dispatch = useDispatch();
  const [locationCookie, _] = useCookies(['location']);
  const location = useSelector((state: RootState) => state.place.location );

  // scroll to top on url change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // scroll to hash
  useLayoutEffect(() => {
    if (hash) {
      const scrollToElement = () => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
        }
      }
      setTimeout(scrollToElement, 100);
    }
  }, [hash]);

  useEffect(() => {
    if(!location) {
      if(locationCookie.location) {
        dispatch(setLocation(locationCookie.location));
      }
    }
  }, [location])

  // get location from cookie
  const [map, setMap] = useState<google.maps.Map | null>(null);

  return <div className="app">
    {/* header */}
    <div className="row header sticky dark align-items-center">
      <div className="col-12 text-center">
        <Link className="fill" to={`/`} />
        <h2 className="m-0 alt-font">Jobber</h2>
      </div>
    </div>

    <LoadScript googleMapsApiKey={secrets.maps_api_key} libraries={mapsLibrariesRef.current} loadingElement={<Loading />}>
      {/*Dummy GoogleMap needed to for Autocomplete component */}
      <GoogleMap
        id="map"
        zoom={1}
        center={{ lat: 0, lng: 0 }}
        onLoad={(map) => {
          setMap(map);
        }}
      />
      <SystemMessageQueue />
      {
        location ? 
          <Routes>
            <Route path='/' element={location ? <ContractorSearch /> : <WelcomePage />} />
            <Route path='/contractor/:contractorId' element={<Contractor />} />
            <Route path='/job-postings' element={<JobPostingsContainer />} />
            <Route path='/job-post/:jobPostId' element={<JobPost />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        : <WelcomePage />
      }
    </LoadScript>
  </div>
}

export default App
