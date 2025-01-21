import { Map, AdvancedMarker, AdvancedMarkerAnchorPoint } from '@vis.gl/react-google-maps';
import { handleCameraChanged, selectContractor } from 'src/store/contractorSearchMapSlice';
import { AppDispatch, RootState } from 'src/store/store';
import ContractorMapPin from './ContractorMapPin';
import { EmptyContractorRatings } from 'src/global-types/ContractorRatingsProps';
import { fetchContractorsThunk } from 'src/thunks/ContractorsThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const ContractorSearchMap : React.FC = () => {

    const { zoom, center } = useSelector((state: RootState) => state.contractorSearchMap);
    const { clientCoordinate } = useSelector((state: RootState) => state.place);
    const { contractorProps, contractorRatings } = useSelector((state: RootState) => state.contractors);
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        dispatch(fetchContractorsThunk({
            searchCoordinates: center,
            radius: 100
        }));
    }, [center])

    return <Map
        id="contractors-map"
        mapId="contractors-map"
        style={{
            width: '100%',
            height: '100%',
        }}
        zoom={zoom}
        center={{lat: center.latitude, lng: center.longitude}}
        onCameraChanged={(ev) => dispatch(handleCameraChanged(ev))}
    >
        {
            clientCoordinate && Object.values(contractorProps).map((props) => {
                return <AdvancedMarker
                    position={{lat: props.serviceArea.location.latitude, lng: props.serviceArea.location.longitude}}
                    key={props.contractorId}
                    title={props.name}
                    onClick={() => dispatch(selectContractor(props))}
                    anchorPoint={AdvancedMarkerAnchorPoint.BOTTOM_LEFT}>
                        <ContractorMapPin {...props} zoom={zoom} {...(contractorRatings[props.contractorId] ?? EmptyContractorRatings)}/>
                    </AdvancedMarker>
            })
        }
    </Map>
}

export default ContractorSearchMap;