import JobPostingsContainer from './features/job-postings/JobPostingsContainer';
import './App.scss'

function App() {

  return (<div className="container-fluid app">
    <div className="row">
      <div className="col-12 text-center py-2 dark bg-color-primary">
        <h2 className="m-0">JOBBER</h2>
      </div>
    </div>
    <div className="row content">
      <div className="col-lg-3 col-12 bg-color-offwhite p-5">
        <h3>Types of Work</h3>
        <ul>
          
        </ul>
      </div>
      <div className="col-lg-9 col-12 p-5">
        <JobPostingsContainer />
      </div>
    </div>
  </div>)
}

export default App
