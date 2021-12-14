import React from 'react';
import ListItem from './ListItem.jsx';
import './layout.css';

const CONST_LIMIT = 25;
const CONST_API = `https://pokeapi.co/api/v2/pokemon?limit=${CONST_LIMIT}&offset=`;

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        pokemon: [],
        page: 0
    };
    this.changePage = this.changePage.bind(this);
    this.fetchPokemon = this.fetchPokemon.bind(this);
  }

  componentDidMount(){
    this.fetchPokemon(this.state.page*CONST_LIMIT);
  }

  changePage(direction) {
    const page = this.state.page + direction;
    this.setState({ 
      pokemon: [], 
      page
    }, this.fetchPokemon(page*CONST_LIMIT));
  };

  fetchPokemon(offset){
    const apiEndpoint = CONST_API.concat(offset);
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
      <div class="m-5">
        <div className="d-grid list-width justify-content-center m-auto">
          {this.state.pokemon.map((item, index) => {
            return <ListItem key={index} url={item.url}/>
          }
          )}
        </div>
        <div className="d-flex justify-content-center m-5">
          <button onClick={() => this.changePage(-1)}>Back</button>
          <button onClick={() => this.changePage(1)}>Next</button>
        </div>
      </div>
    )
  };
};
