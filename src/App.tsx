import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import JobPost from './features/job-postings/JobPost'

function App() {
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
        <JobPost />
        <JobPost />
        <JobPost />
        <JobPost />
        <JobPost />
      </div>
    </div>
  </div>)
}

export default App
