import ContractorProps from "src/global-types/ContractorProps";
import './ContractorMapPin.scss';
import MapPin from 'src/assets/icons/map-pin.svg?react';
import ContractorRatings from "../ratings/ContractorRatings";
import ContractorRatingsProps from "src/global-types/ContractorRatingsProps";

interface ZoomProp {
    zoom: number;
}

const ContractorMapPin: React.FC<ContractorProps & ZoomProp & ContractorRatingsProps> = (props) => {

    const isLarge = props.zoom > 10;

    return <div className={`contractor-map-pin-wrapper ${isLarge ? "large" : "small"}`}>
        { isLarge && <div className="text-wrapper bg-white shadow d-flex flex-column align-items-start">
            <h5 className="mb-1">{props.name}</h5>
            <ContractorRatings type={"stars-only"} contractorId={props.contractorId} ratings={props.ratings} avgStars={props.avgStars} />
        </div> }
        <div className="contractor-map-pin">
            <MapPin/>
        </div>
        <img src={props.profilePicture?.image} className="mb-0 rounded-circle"/>
    </div>
}

export default ContractorMapPin;