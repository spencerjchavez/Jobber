import './ContractorSearch.scss';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import ContractorListItem from "./ContractorListItem";
import { getDistance } from "geolib";
import Loading from '../loading/Loading';
import { Map, AdvancedMarker, MapCameraChangedEvent, AdvancedMarkerAnchorPoint } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import ContractorMapPin from './ContractorMapPin';
import ContractorProps from 'src/global-types/ContractorProps';
import { EmptyContractorRatings } from 'src/global-types/ContractorRatingsProps';

interface LatLng {
    lat: number;
    lng: number;
}

const ContractorSearch: React.FC = () => {
    const { contractorProps, jobCategoryFilter } = useSelector((state: RootState) => state.contractors);
    const { location } = useSelector((state: RootState) => state.place);
    const [ center, setCenter] = useState<LatLng>({lat: 0, lng: 0});
    const [ zoom, setZoom] = useState(12);
    const ratingsByContractorId = useSelector((state: RootState) => state.contractors.contractorRatings);
    const dispatch = useDispatch();

    useEffect(() => {
        if (location != null) {
            setCenter({ lat: location.latitude, lng: location.longitude });
        }
    }, [location]);

    const handleCameraChanged = (ev: MapCameraChangedEvent) => {
        setCenter(ev.detail.center);
        setZoom(ev.detail.zoom);
    }
    
    const handleMapMarkerClicked = (contractorProps: ContractorProps) => {
        console.log(contractorProps)
    }


    return <div className="section">
        <div className="row">
            <div className="col-12 col-lg-6 order-lg-2 h-100vh sticky p-0">
                { /* contractor map */ }
                <div className="d-flex flex-column h-100">
                    <div className="p-2 d-flex flex-row g-2">
                        { /* map filters and preferences */ }
                    </div>
                    <div className="h-100">
                        { location ?
                            <Map
                                id="contractors-map"
                                mapId="contractors-map"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                zoom={zoom}
                                center={center}
                                onCameraChanged={handleCameraChanged}
                            >
                                {
                                    location && Object.values(contractorProps).map((props) => {
                                        return <AdvancedMarker
                                            position={{lat: props.serviceArea.location.latitude, lng: props.serviceArea.location.longitude}}
                                            key={props.contractorId}
                                            title={props.name}
                                            onClick={() => handleMapMarkerClicked(props)}
                                            anchorPoint={AdvancedMarkerAnchorPoint.BOTTOM_LEFT}>
                                                <ContractorMapPin {...props} zoom={zoom} {...(ratingsByContractorId[props.contractorId] ?? EmptyContractorRatings)}/>
                                            </AdvancedMarker>
                                    })
                                }
                            </Map>
                            : <Loading />
                        }
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
