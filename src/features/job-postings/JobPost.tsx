import React from "react";
import JobPostProps from "src/global-types/JobPostProps";


const JobPost: React.FC<JobPostProps> = (props: JobPostProps) => {

    return <div className="row">
        <div className="col-12">
            <h1>Displaying Job Post: {props.jobPostId}</h1>
        </div>
    </div>
}

export default JobPost