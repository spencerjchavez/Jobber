import './ContractorSearch.scss';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import ContractorListItem from "./ContractorListItem";
import { getDistance } from "geolib";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import secrets from 'src/assets/secrets';
import Loading from '../loading/Loading';
import { useRef, useState } from 'react';
import { Library } from '@googlemaps/js-api-loader';

const ContractorSearch: React.FC = () => {
    const { contractorProps, jobCategoryFilter } = useSelector((state: RootState) => state.contractors);
    const { location } = useSelector((state: RootState) => state.place);
    const mapsLibrariesRef = useRef<Library[]>(['places']);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const dispatch = useDispatch();

    return <div className="section">
        <div className="row">
            <div className="col-12 col-lg-6 order-lg-2 h-100vh sticky p-0">
                { /* contractor map */ }
                <div className="d-flex flex-column h-100">
                    <div className="p-2 d-flex flex-row g-2">
                        { /* map filters and preferences */ }
                    </div>
                    <div className="h-100">
                        <GoogleMap
                            id="contractors-map"
                            mapContainerStyle={{
                                width: '100%',
                                height: '100%',
                            }}
                            zoom={1}
                            center={{ lat: 0, lng: 0 }}
                            onLoad={(map) => {
                                console.log(map)
                                setMap(map);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-6">
                { /* Contractor List Items */ }
                <div className="row pt-3">
                    {Array.from(Object.values(contractorProps)).map((contractorProps) => {
                        let show = false;
                        if(location) { 
                            const distanceMiles = getDistance(contractorProps.serviceArea.location, location) / 1609.34;
                            if (distanceMiles < contractorProps.serviceArea.radius) {
                                const isJobCategoryFilterEmpty = () => {
                                    return !Object.values(jobCategoryFilter).reduce((prev, jobCategory) => jobCategory || prev, false);
                                };
                                if(isJobCategoryFilterEmpty()) {
                                    show = true;
                                } else {
                                    contractorProps.jobCategories.forEach((jobCategory) => {
                                        if(jobCategoryFilter[jobCategory]) {
                                            show = true;
                                        }
                                    })
                                }
                            }
                        }
                        return show && <div key={contractorProps.contractorId}  className="col-12">
                            <ContractorListItem {...contractorProps} />
                        </div>;
                    })}
                </div>
            </div>

        </div>
    </div>
}

export default ContractorSearch;
