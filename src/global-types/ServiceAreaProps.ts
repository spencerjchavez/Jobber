import Location from "src/features/locations/Coordinate";

export default interface ServiceAreaProps {
    location: Location;
    radius: number; // in miles
}