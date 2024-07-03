import JobPostingsContainer from './features/job-postings/JobPostingsContainer';
import MainContainer from './components/MainContainer';
import './App.scss'

function App() {

  return (<div className="container-fluid app">
    <div className="row">
      <div className="col-12 text-center py-2 dark bg-color-primary">
        <h2 className="m-0">JOBBER</h2>
      </div>
    </div>
    {/* Insert route countainer here */}
    <MainContainer sidebarLeft = {
      <>
        <h3>Types of Work</h3>
        <ul>
          
        </ul>
      </>
    } mainContent = {
      <JobPostingsContainer />
    } />
  </div>)
}

export default App
