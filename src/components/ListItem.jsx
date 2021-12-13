import React, { useState, useEffect } from 'react';
import './layout.css';

const ListItem = (props) => {
  const [showData, toggleShow] = useState(true);
  const onClick = () => {
    toggleShow(!showData);
  }

  const [data, setData] = useState({
    sprites: { front_default: ''},
    types: []
  });
  useEffect(()=>{
    if(props) {
      fetch(props.item.url, {
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
    <button className="border-0" onClick={onClick}> 
      { showData
        ? <img className="w-100 h-100" src={data.sprites.front_default} alt={props.item.name}/>
        : <div className="d-block line-2">
            <div>#{data.id}</div>
            <div className="text-capitalize">{data.name}</div>
            <div>{data.typeString}</div>
            <div>{data.weight} lbs</div>
        </div>
      }
    </button>
  )
};

export default ListItem;