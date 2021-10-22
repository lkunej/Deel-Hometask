import React from 'react';
import axios from 'axios';

const JobItem = ({onButtonClick, contractId, jobId, idx,
                  desc, price, paid, renderPay,
                  role, profileId, createdAt, paymentDate}) => {

  return (
    <React.Fragment>
      <tr jobid={jobId}>
        <th scope="row">{idx}</th>
        <td>{contractId}</td>
        <td>{desc}</td>
        <td>{createdAt}</td>
        <td>{price}</td>
        <td>{paid}</td>
        <td>{paymentDate}</td>
        { renderPay === true ? role === 'client' ?
          (<td>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onButtonClick(jobId)} >Pay Now</button>
           </td>)
          :
          (<td></td>)
          :
          (<td></td>)
        }
      </tr>
    </React.Fragment>
  );
};

export default JobItem;
