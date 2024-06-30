import React, { useState } from "react";
import JobPostListItem from './JobPostListItem';
import JobPostProps from 'src/global-types/JobPostProps';
import JobPost from './JobPost';

const JobPostingsContainer: React.FC = () => {

    //let jobPostProps: Map<number, JobPostProps> = new Map();
    let jobPostProps: JobPostProps[] = [];

    for(let i = 0; i < 8; i++) {
      jobPostProps.push({
        jobPostId: i,
        authorName: 'Jon Doe',
        authorId: 1,
        profilePictureURL: 'https://mediaproxy.salon.com/width/1200/https://media2.salon.com/2013/06/chris_hayes.jpg',
        category: 'Construction',
        title: 'AC Repair',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        images: []
      });
    }

    const [selectedJobIndex, setSelectedJobIndex] = useState<number | null>(null);

    return <div className="row">
        <div className="col-12">
            {
                // if there is a job selected, display the job, otherwise display the feed of jobs
                selectedJobIndex === null 
                ? jobPostProps.map((props) => {
                    return <JobPostListItem key={props.jobPostId} {...props} />
                })
                : <JobPost {...jobPostProps[selectedJobIndex]} />
            }
        </div>h
    </div>
}

export default JobPostingsContainer;