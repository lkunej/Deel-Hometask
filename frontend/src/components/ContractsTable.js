import React from 'react';
import ContractItem from './ContractItem';

const ContractsTable = ({contracts, profiles}) => {

  var renderedItems = [];
  if(contracts){
    renderedItems = contracts.map((contract, idx)=> {
      var client = profiles.filter(x => x.id === contract.ClientId)
      var contractor = profiles.filter(x => x.id === contract.ContractorId)

      return (
        <ContractItem
          key={idx}
          idx={idx+1}
          contract={contract}
          client={client[0]}
          contractor={contractor[0]}
        />
      );
    });
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Contractor</th>
          <th scope="col">Client</th>
          <th scope="col">Status</th>
          <th scope="col">Terms</th>
        </tr>
      </thead>
      <tbody>
        {renderedItems}
      </tbody>
    </table>

  );
};

export default ContractsTable;
