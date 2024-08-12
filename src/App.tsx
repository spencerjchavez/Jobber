import JobPostingsContainer from './features/job-postings/JobPostingsContainer';
import './App.scss'
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import JobPost from './features/job-postings/JobPost';
import ContractorSearch from './features/contractors/ContractorSearch'
import ErrorPage from './features/ErrorPage';
import Contractor from './features/contractors/Contractor';
import GetInTouch from './features/contractors/GetInTouch';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Library } from '@googlemaps/js-api-loader';
import secrets from './assets/secrets';
import { useCookies } from 'react-cookie';
import handlePlaceSelected from './features/locations/Hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import WelcomePage from './features/welcome/WelcomePage';


function App() {

    const mapsLibrariesRef = useRef<Library[]>(['places']);
    const { hash, pathname } = useLocation();
    const { location } = useSelector((state: RootState) => state.place);
    
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

    // Store / retrieve place id from cookies
    const [placeIdCookie, setPlaceIdCookie] = useCookies(['place_id']);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const dispatch = useDispatch();
    
    useEffect(() => { // gets place from cookie on init
      if (!map) return;
      const placeId = placeIdCookie.place_id;
      if (!placeId ) return;
      const service = new window.google.maps.places.PlacesService(map);
      service.getDetails({ placeId }, (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place != null) {
              handlePlaceSelected(place, dispatch, setPlaceIdCookie);
          } else {
          console.error('Place details request failed:', status);
          }
      });
    }, [map]);

    return (<div className="app">
      {/* header */}
      <div className="row header sticky dark align-items-center">
        <div className="col-12 text-center">
          <Link className="fill" to={`/`} />
          <h2 className="m-0 alt-font">Jobber</h2>
        </div>
      </div>
      <LoadScript googleMapsApiKey={secrets.maps_api_key} libraries={mapsLibrariesRef.current}>
        {/*Dummy GoogleMap needed to get place from placeId cookie */}
        <GoogleMap
            id="map"
            zoom={1}
            center={{lat: 0, lng: 0}}
            onLoad={(map) => {
                setMap(map);
            }}
          />
        <Routes>
          <Route path='/' element={ location ? <ContractorSearch /> : <WelcomePage /> } />
          <Route path='/contractor/:contractorId' element={<Contractor />}/>
          <Route path='/contractor/:contractorId/get-in-touch' element={<GetInTouch />}/>
          <Route path='/job-postings' element={<JobPostingsContainer />} />
          <Route path='/job-post/:jobPostId' element={<JobPost />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </LoadScript>
    </div>)
}

export default App
