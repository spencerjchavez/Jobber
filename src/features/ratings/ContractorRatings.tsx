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
        case 'large':
        default:
            return <Large {...props} />
    }
}

const getStarElements = (stars: number) => {
    return <>
        { // filled stars
            Array.from({length: stars}).map((_, i) => {
                return <div className="d-inline-block color-primary" style={{width: '17px', height:'17px'}} key={i}><StarFilled /></div>
            })
        } 
        { // not-filled stars
            Array.from({length: 5 - stars}).map((_, i) => {
                return <div className="d-inline-block color-primary" style={{width: '17px', height: '17px'}} key={i}><StarOutline /></div>
            })
        }
    </>
}

const CondensedVertical: React.FC<Props> = (props) => {
    return <div className="d-flex flex-column text-center mb-3">
        <div className="d-flex justify-content-center pb-2">
            {getStarElements(props.avgStars)}
        </div>
        <Link to={`/contractor/${props.contractorId}#reviews`}>
            { props.ratings.length > 0
                ? `${props.avgStars}/5 stars from ${props.ratings.length} reviews` 
                : `No Reviews Yet`}
        </Link>
    </div>
}

const Large: React.FC<Props> = (props) => {
    return <div className="row">
        <div className="col-12">
            {props.ratings.map((rating) => {
                return <div className="row p-4 mb-4 shadow">
                    <div className="col-12">
                        {getStarElements(rating.stars)}
                        <p className="mb-0">{rating.text}</p>
                    </div>
                    <div className="col-12 text-end">
                        <p className="d-inline pe-2"><b>Get Author Name</b></p>
                        <img className="d-inline rounded-circle" style={{width: '60px'}} src="https://qph.cf2.quoracdn.net/main-qimg-6f8532751ceb198802a5a438cb5c634e-lq"/>
                    </div> 
                </div>
            })}
        </div>
    </div>
}

export default ContractorRatings;