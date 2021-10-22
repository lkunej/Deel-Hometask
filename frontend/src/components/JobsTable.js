import React from 'react';
import JobItem from './JobItem';

const JobsTable = ({onButtonClick, jobs, role, renderPay, profileId}) => {

  var renderedItems = [];
  if(jobs){
    renderedItems = jobs.map((job, idx)=> {
      return (
        <JobItem
          onButtonClick={onButtonClick}
          key={job.id}
          jobId={job.id}
          profileId={profileId}
          idx={idx+1}
          contractId ={job.ContractId}
          desc={job.description}
          price={job.price}
          paid={job.paid ? "YES" : "NO"}
          role={role}
          createdAt={job.createdAt}
          paymentDate={job.paymentDate}
          renderPay={renderPay}
        />
      );
    });
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Contract Id</th>
          <th scope="col">Description</th>
          <th scope="col">Created At</th>
          <th scope="col">Price</th>
          <th scope="col">Paid</th>
          <th scope="col">Payment Date</th>
          { renderPay === true ? role === 'client' ?
            (<th>Pay for job</th>)
            :
            <th></th>
            :
            <th></th>
          }
        </tr>
      </thead>
      <tbody>
        {renderedItems}
      </tbody>
    </table>

  );
};

export default JobsTable;
