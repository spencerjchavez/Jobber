import './JobPostListItem.scss'
import React from 'react';
import JobPostProps from 'src/global-types/JobPostProps';

interface JobPostListItemProps extends JobPostProps {
    onClick: () => void
}

const JobPostListItem : React.FC<JobPostListItemProps> = (props) => {

    return <>
        <div className='job-post-list-item-container p-3' onClick={props.onClick}>
            <div className="row align-items-center">
                <div className="col-12">
                    <h3 className="d-inline-block pe-3">{props.title}</h3>
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