import { CookieSetOptions } from "node_modules/universal-cookie/cjs/types";
import { setLocation, setPlace, setPlaceName } from "src/store/placeSlice";
import { AppDispatch } from "src/store/store";

const handlePlaceSelected = (place: google.maps.places.PlaceResult, dispatch: AppDispatch, setPlaceIdCookie: (name: "place_id", value: string, options: CookieSetOptions) => void) => {
    if(place.geometry != null && place.place_id != null && place.name != null) {
        const lat = place.geometry.location?.lat();
        const lng = place.geometry.location?.lng();
        if (lat != null && lng != null) {
            const location = {latitude: lat, longitude: lng};
            dispatch(setLocation(location));
            dispatch(setPlace(place.place_id));
            dispatch(setPlaceName(place.name));
            // update cookies
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 14);
            setPlaceIdCookie('place_id', place.place_id, {expires: expirationDate});
        }
    }
}

export default handlePlaceSelected;