import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import 'src/theme-variables.scss';
import { useDispatch } from 'react-redux';
import handlePlaceSelected from './Hooks';
import { useCookies } from 'react-cookie';

const AutocompleteInput: React.FC = () => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const dispatch = useDispatch();
  const [, setLocationCookie] = useCookies(['location']);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      handlePlaceSelected(place, dispatch, setLocationCookie);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <Autocomplete
      onLoad={onLoad}
      options={{fields: ["address_components", "geometry", "name", "place_id"]}}
      onPlaceChanged={onPlaceChanged}
    >
      <input
        type="text"
        placeholder={"Enter a Location"}
        style={{
          border: `1px solid #f9703e`,
          width: `200px`,
          height: '100%',
          padding: '.375rem .75rem',
          outline: 'none',
          fontSize: `16px`,
          textOverflow: `ellipses`,
        }}
      />
    </Autocomplete>
  );
};

export default AutocompleteInput;