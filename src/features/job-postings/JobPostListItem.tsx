import './JobPostListItem.scss'
import React from 'react';
import JobPostProps from 'src/global-types/JobPostProps';

const JobPostListItem : React.FC<JobPostProps> = (props) => {

    return <>
        <div className='job-post-list-item-container p-3'>
            <div className="row align-items-center">
                <div className="col-12">
                    <h4 className="d-inline-block pe-3">{props.title}</h4>
                    <p className="d-inline-block ">posted by: <b>{props.authorName}</b></p>
                </div>
                <div className="col-12">
                    <p>{props.description.substring(0, props.description.indexOf(' ', 350))}... <span className="small"><a>Read More</a></span></p>
                </div>
            </div>
        </div>
    </>
}

export default JobPostListItem;