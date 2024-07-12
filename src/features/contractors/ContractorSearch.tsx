import { useDispatch, useSelector } from "react-redux";
import MainContainer from "../../components/MainContainer";
import { AppDispatch, RootState } from "src/store/store";
import { toggleCategoryOnFilter } from "../../store/contractorsSlice";
import ContractorListItem from "./ContractorListItem";
import { useState } from "react";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import AutocompleteInput from "../locations/AutocompleteInput";
import Location from "../locations/Location";

const ContractorSearch: React.FC = () => {
    
    const { contractorProps, jobCategoryFilter } = useSelector((state: RootState) => state.contractors);
    const dispatch: AppDispatch = useDispatch();
    
    const [searchInput, setSearchInput] = useState('');
    const [searchLocation, setSearchLocation] = useState<Location|null>(null);
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
    <LoadScript googleMapsApiKey="AIzaSyBk_dx_wDfivtCPGCZWXPBwzRQZIXdPT6o" libraries={['places']}>
        <AutocompleteInput onPlaceSelected={handlePlaceSelected}/>
    </LoadScript>
    <MainContainer 
    sidebarLeft={<>
        <h3 className="text-center">Contractor Type</h3>
        {Array.from(jobCategoryFilter.entries()).sort().map((filterEntry) => {
            const jobCategory = filterEntry[0];
            const isActive = filterEntry[1];
            return <a key={jobCategory} className={`btn ${isActive ? 'btn-standard' : 'btn-outline'} color-primary btn-capsule w-100`} onClick={() => dispatch(toggleCategoryOnFilter(jobCategory))}>{jobCategory}</a>
        })}
    </>}
    mainContent={<div className="row">
        <div className="col-12">
        <h4>Showing Contractors Who Serve <a>{searchInput}</a>:</h4> 
            {Array.from(contractorProps.values()).map((contractorProps) => {
                return <ContractorListItem key={contractorProps.contractorId} {...contractorProps} />
            })}
        </div>
    </div>} />
    </>
}

export default ContractorSearch;
