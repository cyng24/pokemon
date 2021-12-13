import React from 'react';
import ListItem from './ListItem.jsx';
import './layout.css';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        pokemon: []
    };
  }

  componentDidMount() {
    const apiEndpoint = 'https://pokeapi.co/api/v2/pokemon?limit=25&offset=0';
    fetch(apiEndpoint, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({ pokemon: data.results });
    })
    .catch(console.error);
  }

  render() {
    return (
      <div>
        <div className="grid justify-content-center m-5">
          {this.state.pokemon.map((item, index) =>
            <ListItem key={index} item={item}/>
          )}
        </div>
        <div className="d-flex justify-content-center m-5">
          <button>Back</button>
          <button>Next</button>
        </div>
      </div>
    )
  };
};
