import './ContractorListItem.scss'
import React from 'react';
import { Link } from 'react-router-dom';
import ContractorProps from 'src/global-types/ContractorProps';

const ContractorListItem : React.FC<ContractorProps> = (props) => {
    return <div className="row align-items-center contractor-list-item p-3">
        <Link to={`/contractor/${props.contractorId}`} className="fill" />
        <div className="col-2">
            <img className="img-fluid rounded-circle" src={props.profilePicture}/>
        </div>
        <div className="col-10">
            <h3>{props.name}</h3>
            <p>{props.specialty}</p>
            <Link className="btn btn-standard color-primary" to={`/contractor/${props.contractorId}/get-in-touch`}>Get In Touch</Link>
            <Link to={`/contractor/${props.contractorId}`} className="btn btn-simple color-primary btn-icon-arrow-right">Click to See Portfolio</Link>
        </div>
    </div>
}

export default ContractorListItem;