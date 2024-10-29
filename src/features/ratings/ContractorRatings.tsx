import ContractorRatingsProps from "src/global-types/ContractorRatingsProps";
import React from 'react'
import StarFilled from '../../assets/icons/star-filled.svg?react';
import StarOutline from '../../assets/icons/star-outline.svg?react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

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
            Array.from({length: 5 - Math.floor(stars)}).map((_, i) => {
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
                ? <>
                    <p>{props.ratings.length} reviews</p>
                </>
                : <p>No Reviews Yet</p>}
        </Link>
    </div>
}

const Large: React.FC<Props> = (props) => {
    const userProps = useSelector((state: RootState) => state.users.userProps);

    return <div className="row g-0">
        {props.ratings.map((rating, i) => {
            const user = userProps[rating.authorUserId];
            if (!user) {
                return <div key={i}></div>
            } else {
                return <div className="col-12 p-4 mb-4 shadow" key={i}>
                    <div className="row" key={i}>
                        <div className="col-12">
                            {getStarElements(rating.stars)}
                            <p className="mt-2">{rating.text}</p>
                        </div>
                        <div className="col-12 text-end">
                            <p className="d-inline pe-2"><b>{user.name}</b></p>
                            <img className="d-inline rounded-circle mb-0" style={{width: '60px'}} src={user.profilePicture}/>
                        </div> 
                    </div>
                </div>
            }
        })}
    </div>
}

export default ContractorRatings;