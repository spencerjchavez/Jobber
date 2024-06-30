import './JobPost.scss'
import React from 'react';
import { CgProfile } from "react-icons/cg";

const JobPost : React.FC = () => {
    return <>
        <div className='job-post-container p-2'>
            <div className="row align-items-center">
                <div className="col-md-1 col-4">
                    <CgProfile />
                </div>
                <div className="col-md-11 col-8">
                    <p><b>John Smith</b></p>
                </div>
                <div className="col-12">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        </div>
    </>
}

export default JobPost;