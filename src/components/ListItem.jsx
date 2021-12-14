import React, { useState, useEffect } from 'react';
import './layout.css';

const ListItem = (props) => {
  const [hideData, toggleShow] = useState(" closed");
  const onClick = () => {
    let newValue = hideData.length ? "" : " closed";
    toggleShow(newValue);
  }

  const [data, setData] = useState({
    sprites: { front_default: ''},
    types: []
  });
  useEffect(()=>{
    if(props) {
      fetch(props.url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      .then(res => res.json())
      .then((data) => {
        data.typeString = data.types.map((type) => type.type.name).join(', ');
        setData(data)
      })
      .catch(console.error);
    }
  }, []);

  return (
    <button className={"w-100 border-0" + hideData} onClick={onClick}> 
      <div className="text-capitalize">{data.name}</div>
      <div className="d-flex">
        <img className="w-50" src={data.sprites.front_default} alt={data.name}/>
        <div className="m-auto stats">
            <div>ID: {data.id}</div>
            <div>TYPE: {data.typeString}</div>
            <div>WEIGHT: {data.weight} lbs</div>
        </div>
      </div>
    </button>
  )
};

export default ListItem;