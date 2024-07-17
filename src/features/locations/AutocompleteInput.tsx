import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import 'src/theme-variables.scss';

interface AutocompleteInputProps {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ onPlaceSelected }) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      onPlaceSelected(place);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <Autocomplete
      className='d-inline-block'
      onLoad={onLoad}
      options={{fields: ["address_components", "geometry", "name"]}}
      onPlaceChanged={onPlaceChanged}
    >
      <input
        type="text"
        placeholder="Enter a Location"
        style={{
          display: 'inline-block',
          //boxSizing: `border-box`,
          border: `1px solid #ccc`,
          borderRadius: '5px',
          width: `200px`,
          padding: `0 5px`,
          //boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `18px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </Autocomplete>
  );
};

export default AutocompleteInput;