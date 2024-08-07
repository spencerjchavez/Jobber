import { useDispatch, useSelector } from "react-redux";
import MainContainer from "src/components/MainContainer";
import { AppDispatch, RootState } from "src/store/store";
import { toggleCategoryOnFilter } from "src/store/contractorsSlice";
import ContractorListItem from "./ContractorListItem";
import { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import AutocompleteInput from "../locations/AutocompleteInput";
import Location from "../locations/Location";
import secrets from "../../assets/secrets";

const ContractorSearch: React.FC = () => {
    const { contractorProps, jobCategoryFilter } = useSelector((state: RootState) => state.contractors);
    const dispatch: AppDispatch = useDispatch();
    
    const [, setSearchInput] = useState('');
    const [, setSearchLocation] = useState<Location|null>(null);
    const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
        setSearchInput(place.name ?? '');
        console.log(place.name ?? '');
        if(place.geometry != null) {
            const lat = place.geometry.location?.lat();
            const lng = place.geometry.location?.lng();
            if (lat != null && lng != null) {
                setSearchLocation({latitude: lat, longitude: lng});
                console.log(lat);
                console.log(lng);
            } else {
                setSearchLocation(null);
            }
        } else {
            setSearchLocation(null);
        }
    }

    return <>
    <MainContainer 
    sidebarLeft={<div>
        <h3 className="text-center">Contractor Type</h3>
        {Array.from(Object.entries(jobCategoryFilter)).sort().map((filterEntry) => {
            const jobCategory = filterEntry[0];
            const isActive = filterEntry[1];
            return <a key={jobCategory} className={`btn ${isActive ? 'btn-standard' : 'btn-outline'} color-primary btn-capsule w-100`} onClick={() => dispatch(toggleCategoryOnFilter(jobCategory))}>{jobCategory}</a>
        })}
    </div>}
    mainContent={<div className="row">
        <div className="col-12">
            <LoadScript googleMapsApiKey={secrets.maps_api_key} libraries={['places']}>
                <h4 className="d-inline-block me-2">Showing Contractors Near:</h4>
                <AutocompleteInput onPlaceSelected={handlePlaceSelected}/>
            </LoadScript>
            {Array.from(Object.values(contractorProps)).map((contractorProps) => {
                return <ContractorListItem key={contractorProps.contractorId} {...contractorProps} />
            })}
        </div>
    </div>} />
    </>
}

export default ContractorSearch;
