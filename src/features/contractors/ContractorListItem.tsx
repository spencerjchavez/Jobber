import './ContractorListItem.scss'
import React from 'react';
import { Link } from 'react-router-dom';
import ContractorProps from 'src/global-types/ContractorProps';

const ContractorListItem : React.FC<ContractorProps> = (props) => {
    return <Link to={`/contractor/${props.contractorId}`}>
        <div className='contractor-list-item p-3'>
            <div className="row align-items-center">
                <div className="col-12">
                    <h3>{props.name}</h3>
                    <p className="d-inline-block ">{props.specialty}</p>
                </div>
            </div>
        </div>
    </Link>
}

export default ContractorListItem;