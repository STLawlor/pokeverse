import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function PokemonCard({ url, name }) {
  const [pokemon, setPokemon] = useState();
  const [sprite, setSprite] = useState();
  const [abilities, setAbilities] = useState([]);

  async function getPokemon() {
    try {
      const res = await fetch(`${url}`);
      const data = await res.json();
      setPokemon(data);
      setAbilities(data.abilities);
      setSprite(data.sprites.front_default);
    } catch (err) {
      console.log("An error occured! ", err);
    }
  }

  useEffect(() => {
    getPokemon();
  }, [name]);

  return (
    <>
      {pokemon && (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={sprite} />
          <Card.Body>
            <Card.Title>
              <h4 className="text-capitalize">{name}</h4>
            </Card.Title>
            <Card.Text as="div">
              <ul>
                {abilities.map((ability, i) => {
                  return (
                    <li key={i}>{ability.ability.name}</li>
                  )
                })}
              </ul>
            </Card.Text>
            <Button variant="primary">View Pokemon</Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export { PokemonCard };
