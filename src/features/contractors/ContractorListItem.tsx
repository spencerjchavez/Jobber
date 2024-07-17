import './ContractorListItem.scss'
import React from 'react';
import { Link } from 'react-router-dom';
import ContractorProps from 'src/global-types/ContractorProps';
import ContractorRatings from '../ratings/ContractorRatings';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
const ContractorListItem : React.FC<ContractorProps> = (props) => {
    const contractorRatings = useSelector((state: RootState) => state.contractors.contractorRatings[props.contractorId]);
    return <div className="row contractor-list-item">
        <Link to={`/contractor/${props.contractorId}`} className="fill" />
        <div className="col-2 text-center">
            <img className="img-fluid rounded-circle mb-1" src={props.profilePicture}/>
            { contractorRatings && <ContractorRatings type='condensed-vertical' {...contractorRatings}/> }
        </div>
        <div className="col-10">
            <h3 className="d-inline-block">{props.name}</h3>
            <p>{props.specialty}</p>
            <Link className="btn btn-standard color-primary" to={`/contractor/${props.contractorId}/get-in-touch`}>Get In Touch</Link>
            <Link to={`/contractor/${props.contractorId}`} className="btn btn-simple color-primary btn-icon-arrow-right">View Portfolio</Link>
        </div>
    </div>
}

export default ContractorListItem;