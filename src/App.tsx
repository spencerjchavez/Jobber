import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import JobPostListItem from './features/job-postings/JobPostListItem'
import JobPostProps from './global-types/JobPostProps'

function App() {

  let jobPostProps: JobPostProps[] = [];
  for(let i = 0; i < 8; i++) {
    jobPostProps.push({
      jobPostId: 1,
      authorName: 'Jon Doe',
      authorId: 1,
      profilePictureURL: 'https://mediaproxy.salon.com/width/1200/https://media2.salon.com/2013/06/chris_hayes.jpg',
      category: 'Construction',
      title: 'AC Repair',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: []
    })
  }

  return (<div className="container-fluid">
    <div className="row">
      <div className="col-12 text-center py-2 dark bg-color-primary">
        <h1 className="m-0">JOBBER</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-3 col-12 bg-color-offwhite p-5">
        <h3>Types of Work</h3>
        <ul>
          
        </ul>
      </div>
      <div className="col-lg-9 col-12 p-5">
        { jobPostProps.map((props) => {
          return <JobPostListItem {...props}/>
        })}
      </div>
    </div>
  </div>)
}

export default App
