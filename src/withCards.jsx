import React from 'react';
import update from 'immutability-helper';
import axios from 'axios';

import Animal from './Animal';

export default function withCards(Component) {
  return class extends React.Component {
    state = {
      computer: [],
      player: [],
    };

    async componentDidMount() {
      const { data } = await axios.get('http://localhost:3001/card');
      this.dealCards(data);
    }

    dealCards(cards) {
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
      this.setState(state =>
        update(state, {
          player: { $set: player },
          computer: { $set: computer },
        })
      );
    }

    render() {
      const { computer, player } = this.state;
      return <Component {...this.props} computer={computer} player={player} />;
    }
  };
}