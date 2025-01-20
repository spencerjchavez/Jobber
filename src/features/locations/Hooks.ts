import { CookieSetOptions } from "node_modules/universal-cookie/cjs/types";
import { setCoordinate } from "src/store/placeSlice";
import { AppDispatch } from "src/store/store";
import Coordinate from "./Coordinate";

const handlePlaceSelected = (
    place: google.maps.places.PlaceResult, 
    dispatch: AppDispatch, 
    setLocationCookie: (name: 'location', value: Coordinate, options: CookieSetOptions) => void) => {
        if(place.geometry != null && place.place_id != null && place.name != null) {
            const lat = place.geometry.location?.lat();
            const lng = place.geometry.location?.lng();
            if (lat != null && lng != null) {
                const location = {latitude: lat, longitude: lng};
                dispatch(setCoordinate(location));
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 14);
                setLocationCookie('location', location, {expires: expirationDate});
            }
        }
    }

export default handlePlaceSelected;