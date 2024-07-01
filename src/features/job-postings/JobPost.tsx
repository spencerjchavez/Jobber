import React from "react";
import JobPostProps from "src/global-types/JobPostProps";

interface JobPostComponentProps extends JobPostProps {
    onClick: () => void
}

const JobPost: React.FC<JobPostComponentProps> = (props: JobPostComponentProps) => {

    return <div className="row">
        <div className="col-12">
            <div className='p-3' onClick={props.onClick}>
                <div className="row align-items-center">
                    <div className="col-lg-6 col-12">
                        <h2 className="d-inline-block pe-3">{props.title}</h2>
                    </div>
                    <div className="col-lg-5 col-11 text-end">
                        <p className="">posted on {(props.postDate.getMonth() + 1) + '/' + props.postDate.getDate()} by: <b>{props.authorName}</b></p>
                    </div>
                    <div className="col-1">
                        <img className="img-fluid" src={props.profilePictureURL} />
                    </div>
                    <div className="col-12">
                        <p>{props.description}</p>
                    </div>
                    { 
                    props.images
                    ? <div className="col-12">
                        <h4>Project Images:</h4>
                        {props.images.map((imageURL) => {
                            return <img className="img-fluid" src={imageURL} />
                        })}
                    </div>
                    : null
                    }
                </div>
            </div>
        </div>
    </div>
}

export default JobPost