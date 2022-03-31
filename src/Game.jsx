import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Card from './Card';
import './Game.css';
import useCards from './useCards';

export default function Game({ title }) {
  const [state, play] = useCards();

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