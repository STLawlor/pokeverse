import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
  const [pokeData, setPokeData] = useState();
  const [filteredPokeData, setFilteredPokeData] = useState();

  async function getpokeData() {
    try {
      const res = await fetch(`${pokeApi}`);
      const data = await res.json();
      setPokeData(data.results);
      setFilteredPokeData(data.results);
    } catch (err) {
      console.log("An error occured! ", err)
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    const regex = new RegExp(value, 'gi');
    const filteredData = pokeData.filter((pokemon) => {
      return pokemon.name.match(regex);
    });

    setFilteredPokeData(filteredData);
  }

  useEffect(() => {
    getpokeData();
  }, []);

  return (
    <div data-testid="app">
      <Navigation />
      <InputGroup className="mb-3" >
        <InputGroup.Text id="basic-addon1" >Search</InputGroup.Text>
        <Form.Control
          aria-label="search"
          aria-describedby="basic-addon1"
          onChange={() => handleChange(event)}
        />
      </InputGroup>
      {filteredPokeData && 
        filteredPokeData.map((pokemon, idx) => {
          return (
            <PokemonCard
              key = { idx }
              name= { pokemon.name }
              url = { pokemon.url }
            />
          )
        })
      }
      {!filteredPokeData &&
        <Alert>
          Fetching Pokemon data...
        </Alert>
      }
    </div>
  );
}

export { App };
