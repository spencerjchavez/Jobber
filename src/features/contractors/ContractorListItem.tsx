import './ContractorListItem.scss'
import React from 'react';
import { Link } from 'react-router-dom';
import ContractorProps from 'src/global-types/ContractorProps';
import ContractorRatings from '../ratings/ContractorRatings';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
const ContractorListItem : React.FC<ContractorProps> = (props) => {
    const contractorRatings = useSelector((state: RootState) => state.contractors.contractorRatings[props.contractorId]);
    return <div className="row contractor-list-item p-3">
        <Link to={`/contractor/${props.contractorId}`} className="fill" />
        <div className="col-4 col-lg-4 text-center">
            <img className="img-fluid rounded-circle mb-1" src={props.profilePicture?.image}/>
            { contractorRatings && <ContractorRatings type='condensed-vertical' {...contractorRatings}/> }
        </div>
        <div className="col-8 col-lg-8">
            <h3 className="d-inline-block">{props.name}</h3>
            <p>{props.specialty}</p>
            <Link className="btn btn-standard color-primary btn-icon-arrow-right" to={`/contractor/${props.contractorId}#contact`}>Get In Touch</Link>
            <Link to={`/contractor/${props.contractorId}`} className="btn btn-simple color-primary btn-icon-arrow-right">View Contractor</Link>
        </div>
    </div>
}

export default ContractorListItem;