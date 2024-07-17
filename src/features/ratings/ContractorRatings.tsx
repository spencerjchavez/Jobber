import ContractorRatingsProps from "src/global-types/ContractorRatingsProps";
import React from 'react'
import StarFilled from '../../assets/star-filled.svg?react';
import StarOutline from '../../assets/star-outline.svg?react';
import { Link } from "react-router-dom";

interface Props extends ContractorRatingsProps {
    type: string;
}

const ContractorRatings: React.FC<Props> = (props) => {
    switch(props.type) {
        case 'condensed-vertical':
            return <CondensedVertical {...props} />
        case 'standard':
        default:
            return <></>
    }
}

const CondensedVertical: React.FC<Props> = (props) => {
    return <div className="d-flex flex-column text-center mb-3">
        <div className="d-flex justify-content-center pb-2">
            { // filled stars
                Array.from({length: props.avgStars}).map((_, i) => {
                    return <div className="d-inline-block color-primary" style={{width: '17px', height:'17px'}} key={i}><StarFilled /></div>
                })
            } 
            { // not-filled stars
                Array.from({length: 5 - props.avgStars}).map((_, i) => {
                    return <div className="d-inline-block color-primary" style={{width: '17px', height: '17px'}} key={i}><StarOutline /></div>
                })
            }
        </div>
        <Link to={`/contractor/${props.contractorId}#reviews`}>
            { props.ratings.length > 0
                ? `${props.avgStars}/5 stars from {props.ratings.length} reviews` 
                : `No Reviews Yet`}
        </Link>
    </div>
}

export default ContractorRatings;