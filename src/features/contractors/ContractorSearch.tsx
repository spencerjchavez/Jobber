import './ContractorSearch.scss';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store/store";
import ContractorListItem from "./ContractorListItem";
import { getDistance } from "geolib";
import Loading from '../loading/Loading';
import { Map, AdvancedMarker, MapCameraChangedEvent, AdvancedMarkerAnchorPoint } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import ContractorMapPin from './ContractorMapPin';
import ContractorProps from 'src/global-types/ContractorProps';
import { EmptyContractorRatings } from 'src/global-types/ContractorRatingsProps';
import Contractor from './Contractor';
import { fetchContractorsThunk } from 'src/thunks/ContractorsThunk';
import Coordinate from 'src/features/locations/Coordinate';

const ContractorSearch: React.FC = () => {
    const { contractorProps, jobCategoryFilter } = useSelector((state: RootState) => state.contractors);
    const { clientCoordinate } = useSelector((state: RootState) => state.place);
    const [ center, setCenter] = useState<Coordinate>({latitude: 0, longitude: 0});
    const [ zoom, setZoom] = useState(12);
    const [ selectedContractor, setSelectedContractor] = useState<ContractorProps>();
    const ratingsByContractorId = useSelector((state: RootState) => state.contractors.contractorRatings);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchContractorsThunk({
            searchCoordinates: center,
            radius: 100
        }));
    }, [center])

    useEffect(() => {
        if (clientCoordinate != null) {
            setCenter({ latitude: clientCoordinate.latitude, longitude: clientCoordinate.longitude });
        }
    }, [clientCoordinate]);

    const handleCameraChanged = (ev: MapCameraChangedEvent) => {
        setCenter({latitude: ev.detail.center.lat, longitude: ev.detail.center.lng});
        setZoom(ev.detail.zoom);
    }
    
    const handleMapMarkerClicked = (contractorProps: ContractorProps) => {
        const clientCoordinate = contractorProps.serviceArea.location;
        setCenter({latitude: clientCoordinate.latitude, longitude: clientCoordinate.longitude});
        setSelectedContractor(contractorProps);
    }

    return <div className="section">
        <div className="row g-0 w-100">
            <div className="col-12 col-lg-8 h-100vh sticky p-0">
                { /* contractor map */ }
                <div className="d-flex flex-column h-100">
                    <div className="p-0 d-flex flex-row g-2">
                        { /* map filters and preferences */ }
                    </div>
                    <div className="h-100">
                        { clientCoordinate ?
                            <Map
                                id="contractors-map"
                                mapId="contractors-map"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                zoom={zoom}
                                center={{lat: center.latitude, lng: center.longitude}}
                                onCameraChanged={handleCameraChanged}
                            >
                                {
                                    clientCoordinate && Object.values(contractorProps).map((props) => {
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
            <div className="col-12 col-lg-4">
                {
                    selectedContractor 
                    ?  <Contractor {...selectedContractor}/>
                    : <>
                        { /* Contractor List Items */ }
                        {Array.from(Object.values(contractorProps)).map((contractorProps) => {
                            let show = false;
                            if(clientCoordinate) { 
                                const distanceMiles = getDistance(contractorProps.serviceArea.location, clientCoordinate) / 1609.34;
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
                            return show && <ContractorListItem key={contractorProps.contractorId} {...contractorProps} />
                        })}
                    </>
                }                
            </div>
        </div>
    </div>
}

export default ContractorSearch;
