import React from 'react';
import {Component} from 'react';
import "./App.css"
import PokemonCard from "./Components/PokemonCard"
import Grid  from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from './Components/Header'


/*As a Pokemon enthusiast I want to be able to search for the information about a specific
Pokemon aka search by name or order and pull related data 


note this is not the most efficient way of performing the task. 
Ideally since it is rarely changed data we could pull the entire list and work with it
However for this example we'll assume that data will always come from the api
*/


class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemons : [],
      pokemonDetails : [],
      index: 0,
      loadNumber: 20    
    }
    this.loadMore = this.loadMore.bind(this);
    this.searchByNameOrId = this.searchByNameOrId.bind(this);
  }
 
  // used to fetch the next batch of pokemon
  getNextindex() {
    return this.state.index+this.state.loadNumber;
  }
  // resets state
  resetState(){
    this.setState({
      
        pokemons : [],
        pokemonDetails : [],
        index: 0,
        loadNumber: 20   
      });
      this.getMorePokemon();
  }

  // loads more pokemos
  loadMore(event) {
    // we only load one if a search was performed so we reset state to prevent duplicates
    if(this.state.pokemonDetails.length  <= 1){
      console.log("reset state")
      this.resetState();
    }
    const newindex = this.getNextindex();
    
    this.setState({index: newindex, }, () => {
      this.getMorePokemon();
    });
    
  }
  
  componentDidMount() {
    this.getMorePokemon();
  }

  // allows to search by name or Id
  searchByNameOrId(searchString){
    if(!searchString || searchString.length === 0){
      this.resetState()
      this.getMorePokemon()
      return;
    }
  
    let url = "https://pokeapi.co/api/v2/pokemon/"+searchString.toLowerCase()+"/";
   
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data) {
              var temp = [];
              temp.push(data)
              this.setState({pokemonDetails: temp})
            }            
          })
          .catch((ex)=>{
            console.log("something went wrong"+ex)
            this.resetState();
            this.getMorePokemon();
          })
       
  }

  // loads a segment of the pokemons
  getMorePokemon() {
    let url = "https://pokeapi.co/api/v2/pokemon?offset=" + this.state.index + "&limit=" + this.state.loadNumber;
    console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data) {
        this.setState({pokemons : data.results})

        this.state.pokemons.map(pokemon => {
          fetch(pokemon.url)
          .then(response => response.json())
          .then(data => {
            if (data) {
              var temp = this.state.pokemonDetails
              temp.push(data)
              this.setState({pokemonDetails: temp})
            }            
          })
          .catch(console.log)
          return true;
        })
      }
    })
    .catch(console.log)
  }

  render() {
    const {pokemonDetails} = this.state;

    const renderedPokemonList = pokemonDetails.map((pokemon, index) => {
      // map our pokemon to our cards
      return (<PokemonCard pokemon={pokemon} key={index} />);
    });


    return (
     <Container>
       <Header searchFunction = {this.searchByNameOrId} ></Header>
        <Grid container spacing= {3} >
          {renderedPokemonList}
        </Grid>

        <Button variant="contained" color="primary" onClick={this.loadMore}>
          Load More
        </Button>
      </Container>
    );
  }
}

export default App;