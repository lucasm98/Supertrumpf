import * as React from 'react';
import PropTypes from 'prop-types';

import './Game.css';
import Card from './Card';
import Animal from './Animal';

export default class Game extends React.Component {
  static deafultProps = {
    title : 'Supertrumpf',
  }

  static propTypes = {
    title: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      playersTurn : true,
      player : [new Animal('Elefant', 'placeholder.png', 3.3, 6000, 70, 1 ,40),],
      computer : [new Animal('Nashorn', 'placeholder.png', 1, 9, 2300, 50, 1, 50),],
    };
  }
  render (){
  const { playersTurn, player,computer} = this.state;
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div className = "info">
          {playersTurn ? 'Du bist' : 'Der Computer '} ist dran
        </div>
        <div className="cards">
          <Card animal={player[0]} uncovered={playersTurn} />
          <Card animal={computer[0]} uncovered={!playersTurn} />
        </div>
      </div>
    );
  }
}
