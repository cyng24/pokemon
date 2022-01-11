import React, { useState, useEffect } from 'react';
import './layout.css';

const ListItem = (props) => {
  const [data, setData] = useState();
  useEffect(()=>{
    fetch(`https://pokeapi.co/api/v2${props.pathname}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then((data) => setData(data))
    .catch(console.error);
  }, [props]);

  function joinTypes(types) {
    return types.length > 0 
      ? types.map((type) => type.type.name).join(', ')
      : 'none';
  }

  return (
    <div>
      { data && (
        <div className="w-50 m-auto border border-5">
          <div className="text-center text-uppercase fs-1 pt-3">{data.name}</div>
          <div className="d-flex">
            <img className="w-50" src={data.sprites.front_default} alt={data.name}/>
            <div className="m-auto stats">
                <div>ID: {data.id}</div>
                <div>TYPE: {joinTypes(data.types)}</div>
                <div>WEIGHT: {data.weight} lbs</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

export default ListItem;