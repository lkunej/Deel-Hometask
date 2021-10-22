import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "./App.css";
import Navbar from './components/Navbar';
import ContractsTable from './components/ContractsTable';
import JobsTable from './components/JobsTable';
import SearchBar from './components/SearchBar';

const App = () => {

  const [contracts, setContracts] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [unpaidJobs, setUnpaidJobs] = useState(null);
  const [profiles, setAllProfiles] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);

  const onSearchSubmit = async (id) => {
    const url = "/contracts/"+id;
    if(currentProfile && id){
      try {
        const response = await axios.get(url, {
          headers: {
            "profile_id": currentProfile.id
          },
        });
        setSearchResult([response.data.data]);
        alert("Found contract!")
      }
      catch (err) {
        alert("Unauthorized to view that contract!")
      }
      console.log(searchResult);
    } else {
      var message = "";
      if(!currentProfile) message += "Please select profile from top left dropdown and enter contract ID!\n"
      if(!id) message += "Please enter contract ID!\n"
      alert(message)
    }
  };

  const onButtonClick = async (jobId) => {
    console.log(jobId);
    const url = "/jobs/"+jobId+"/pay";
    const headers =  {
      "profile_id": currentProfile.id,
    }
    try {
      const {data} = await axios.post(url, null, {headers});
      alert(data.message)
      getJobs();
      getUnpaidJobs();
    } catch (error) {
      alert("Cannot make payment!")
    }

  };

  const onSelectedChange = (profile) => {
    setCurrentProfile(profile)
  };

  const getUnpaidJobs = async () => {
    const {data} = await axios.get("/jobs/unpaid", {
      headers: {
        "profile_id": currentProfile.id
      },
    });
    setUnpaidJobs(data.data)
  };

  const getJobs = async () => {
    const {data} = await axios.get("/jobs", {
      headers: {
        "profile_id": currentProfile.id
      },
    });
    setJobs(data.data)
  };

  useEffect(() => {
    const getProfiles = async () => {
      const {data} = await axios.get("/getProfiles", {
      });
      setAllProfiles(data);
    };

    const getContracts = async () => {
      const {data} = await axios.get("/contracts", {
        headers: {
          "profile_id": currentProfile.id
        },
      });
      setContracts(data.data)
    };

    getProfiles();
    if(currentProfile){
      getContracts();
      getJobs();
      getUnpaidJobs();
      setCurrentRole(currentProfile.type)
    }
  }, [currentProfile]);

  var profile_id = 0;
  if(currentProfile){
    profile_id = currentProfile.id;
  }
  return(
    <div id="main-div">
      <Navbar onSelectedChange= {onSelectedChange}
              currentProfile={currentProfile}
              profiles={profiles}
       />
     <div className="container pb-5">
       <div className="row mb-2">
         <h2> Contracts </h2>
       </div>
       <div className="row">
         <div className="col-md-12">
           <h3>GET /Contracts/:id</h3>
           <p>GET /contracts/:id - Returns the contract only if it belongs to the profile calling.</p>
           <p>Please choose a profile in top left corner before serching for contract.</p>
           <p>Search by entering contract id and pressing enter</p>
           <p>403 Error means Forbidden and that contract doesn't belong to current Profile. </p>
           <p>For testing you can try selecting Alan Turing and searching for contract #4</p>
           <SearchBar label="Search By Id:"
                      onSubmit={onSearchSubmit}/>
           <ContractsTable contracts={searchResult} profiles={profiles}/>
           <hr/>
         </div>
       </div>
       <hr />
       <div className="row">
        <div className="col-md-12">
          <h3>GET /Contracts</h3>
          <p>Returns a list of contracts belonging to currently active profile (client or contractor), the list contains only non terminated contracts.</p>
          <p>This table will update automatically when you change current profile.</p>
          <hr/>
          <ContractsTable contracts={contracts} profiles={profiles}/>
        </div>
       </div>
       <div className="row mt-5 mb-2">
         <h2> Jobs </h2>
       </div>
       <div className="row">
         <div className="col-md-12">
           <h3>GET /jobs</h3>
           <p>Returns all previous and current jobs for current profile.</p>
           <p>This table will update automatically when you change current profile.</p>
           <p>For testing you can try selecting Alan Turing (1 paid job)</p>
           <JobsTable onButtonClick={onButtonClick} jobs={jobs} role={currentRole} renderPay={false} profileId={profile_id}/>
           <hr/>
         </div>
       </div>
       <hr />
       <div className="row">
        <div className="col-md-12">
          <h3>GET /jobs/unpaid</h3>
          <p>Returns a list unpaid jobs for current profile.</p>
          <p>This table will update automatically when you change current profile.</p>
          <p>For testing you can try selecting Alan Turing (not showing paid job)</p>
          <h3>POST /jobs/:job_id/pay</h3>
          <p>Pay for a job, a client can only pay if his balance >= the amount to pay. The amount is moved from the client's balance to the contractor balance.</p>
          <p>You can pay a job by clicking on the "Pay" button in jobs row.</p>
          <p>Known bug: balance is not updated automatically, must reselect profile to see change.</p>
          <hr/>
          <JobsTable onButtonClick={onButtonClick} jobs={unpaidJobs} role={currentRole} renderPay={true} profileId={profile_id}/>
        </div>
       </div>

     </div>
    </div>
  );
};

export default App;
