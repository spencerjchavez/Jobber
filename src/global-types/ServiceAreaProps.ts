import Location from "src/features/locations/Location";

export default interface ServiceAreaProps {
    location: Location;
    radius: number; // in miles
}