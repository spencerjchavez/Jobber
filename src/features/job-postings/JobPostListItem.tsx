import './JobPostListItem.scss'
import React from 'react';
import { Link } from 'react-router-dom';
import JobPostProps from 'src/global-types/JobPostProps';

const JobPostListItem : React.FC<JobPostProps> = (props) => {

        return <Link to={`/job-post/${props.jobPostId}`}>
        <div className='job-post-list-item p-3'>
            <div className="row align-items-center">
                <div className="col-12">
                    <h3 className="d-inline-block pe-3">{props.title}</h3>
                    <p className="d-inline-block ">posted by: <b>{props.authorName}</b></p>
                </div>
                <div className="col-12">
                    <p>{props.description.substring(0, props.description.indexOf(' ', 350))}... <span className="small a">Read More</span></p>
                </div>
            </div>
        </div>
    </Link>
}

export default JobPostListItem;