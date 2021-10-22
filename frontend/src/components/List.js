import React from 'react';

const List = ({items}) => {

  var renderedItems = [];
  if(items){
    renderedItems = items.map((item, idx)=> {
      console.log(item)
    return (
      <li>
        <div style={{textAlign: "left" }} className="d-inline">{item}</div>
      </li>
    );
    });
  }

  return (
    <div>
      <ul>
        {renderedItems}
      </ul>
    </div>

  );
};

export default List;
