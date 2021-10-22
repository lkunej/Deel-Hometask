import React from 'react';

const ContractItem = ({contract, idx, client, contractor}) => {
  return (
    <React.Fragment>
      <tr>
        <th scope="row">{idx}</th>
        <td>{`${contractor.firstName} ${contractor.lastName}`}</td>
        <td>{`${client.firstName} ${client.lastName}`}</td>
        <td>{contract.status}</td>
        <td>{contract.terms}</td>
      </tr>
    </React.Fragment>
  );
};

export default ContractItem;
