import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import axios from 'axios';

import Animal from './Animal';
import selectRandomProperty from './selectRandomProperty';
import Card from './Card';
import './Game.css';

export default function Game({ title }) {
  const [state, setState] = useState({
    computerUncovered: false,
    selectedProperty: '',
    playersTurn: true,
    player: [],
    computer: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:3001/card');
      dealCards(data)
    };
    fetchData();
  }, []);

  useEffect(() => {
    if(state.selectedProperty !== '') {
      setTimeout(() => {
       compare(state.selectedProperty);
      },2000);
    }
  }, [state.selectedProperty]);

  useEffect(() => {
    if(
      state.computerUncovered === false &&
      state.selectedProperty === '' &&
      state.playersTurn === false
    ) {
      setTimeout(() => {
        const property = selectRandomProperty();
        play(property);
      }, 2000);
    }
  }, [state.computerUncovered, state.selectedProperty, state.playersTurn]);

  function compare(property) {
    let playersTurn = state.playersTurn;
    const firstPlayer = state.player[0];
    let player = update(state.player, {$splice: [[0, 1]]});
    const firstComputer = state.computer[0];
    let computer = update(state.computer, {$splice: [[0, 1]]});
    if(firstPlayer[property] > firstComputer[property]) {
      playersTurn = true;
      player = update(player, { $push: [firstPlayer, firstComputer]});
      if(computer.length === 0 ){
        alert('Player wins'); return;
      }
    } else if(firstPlayer[property] < firstComputer[property]){
      playersTurn = false;
      computer = update(computer, { $push: [firstPlayer,firstComputer]});
      if(player.length === 0 ) {
        alert('Computer wins');
      }
    } else {
      player = update(player, { $push: [firstPlayer]});
      computer = update(computer, { $push: [firstComputer]});
    }
    setState( state =>
      update(state, {
        $set: {
          computerUncovered: false,
          selectedProperty: '',
          playersTurn,
          player,
          computer,
        },
      }),
    );
  }

  function play(property) {
    setState( state =>
      update(state, {
       selectedProperty: { $set: property},
       computerUncovered: { $set: true},
      })
    );
  }

  function dealCards(cards) {
    const computer = [];
    const player = [];

    cards.forEach((card, index) => {
      const animal = new Animal(
        card.name,
        card.image,
        card.size,
        card.weight,
        card.age,
        card.offspring,
        card.speed
      );
      if (index % 2 === 0) {
        computer.push(animal);
      } else {
        player.push(animal);
      }
    });
    setState(prevState =>
      update(prevState, {
        player: { $set: player },
        computer: { $set: computer },
      })
    );
  }

  return (
    <>
      <h1>{title}</h1>
      <div className="info">
        {state.playersTurn ? 'Du bist' : 'Der Computer ist'} an der Reihe
      </div>
      <div className="cards">
        {state.player[0] && (
          <Card
            animal={state.player[0]}
            uncovered={true}
            selectedProperty={state.selectedProperty}
            onSelectProperty={play}
          />
        )}
        {state.computer[0] && (
          <Card
            animal={state.computer[0]}
            uncovered={state.computerUncovered}
            selectedProperty={state.selectedProperty}
          />
        )}
      </div>
    </>
  );
}

Game.propTypes = {
  title: PropTypes.string.isRequired,
};