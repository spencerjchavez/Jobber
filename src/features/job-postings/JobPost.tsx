import { Button } from "antd";
import React from "react";
import JobPostProps from "src/global-types/JobPostProps";

interface JobPostComponentProps extends JobPostProps {
    onClick: () => void
}

const JobPost: React.FC<JobPostComponentProps> = (props: JobPostComponentProps) => {
    return <div className="row">
        <div className="col-12 p-3">
            <button onClick={props.onClick} className="btn-arrow-left btn-simple">Back to Posts</button>
            <div className="row align-items-center">
                <div className="col-lg-6 col-12">
                    <h3 className="d-inline-block pe-3">{props.title}</h3>
                </div>
                <div className="col-lg-6 col-12 pb-2 text-end">
                    <p className="mb-0 me-2 d-inline-block">posted on {(props.postDate.getMonth() + 1) + '/' + props.postDate.getDate()} by: <b>{props.authorName}</b></p>
                    <img className="img-fluid" style={{width: "80px"}} src={props.profilePictureURL} />
                </div>
                <div className="col-12">
                    <p>{props.description}</p>
                </div>
                { 
                    props.images.length > 0 && <div className="col-12">
                        <h4>Project Images:</h4>
                        {props.images.map((imageURL) => {
                            return <img className="img-fluid" src={imageURL} />
                        })}
                    </div>
                }
                
            </div>
        </div>
    </div>
}

export default JobPost