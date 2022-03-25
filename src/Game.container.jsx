import * as React from 'react';
import * as PropTypes from 'prop-types';
import update from 'immutability-helper';

import GameComponent from './Game';
import Animal from './Animal';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.play = this.play.bind(this);
  }

  static defaultProps = {
    title : 'Supertrumpf',
  };

  static propTypes = {
    title: PropTypes.string,
  };

  state = {
    computerUncovered: false,
    selectedProperty: '',
    playersTurn : true,
    player : [],
    computer : [],
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.player.length === 0 &&
      this.props.player.length > 0 &&
      prevProps.computer.length === 0 &&
      this.props.computer.length > 0
    ) {
      this.setState(state =>
        update(state, {
          player: { $set: this.props.player },
          computer: { $set: this.props.computer },
        })
      );
    }
  }

  compare(property) {
    let playersTurn = this.state.playersTurn;
    const firstPlayer = this.state.player[0];
    let player = update(this.state.player, {$splice: [[0, 1]]});
    const firstComputer = this.state.computer[0];
    let computer = update(this.state.computer, {$splice: [[0, 1]]});
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
    this.setState(
      state =>
        update(state, {
          $set: {
            computerUncovered: false,
            selectedProperty: '',
            playersTurn,
            player,
            computer,
          },
        }),
      () => {
        if(!playersTurn) {
          setTimeout(() => {
            const property = this.selectRandomProperty();
            this.play(property);
          }, 2000);
        }
      },
    );
  }

  play(property) {
    this.setState(
      state =>
        update(this.state, {
          selectedProperty: { $set: property},
          computerUncovered: { $set: true},
        }),
      () => {
        setTimeout(() => {
          this.compare(property);
        }, 2000);
      },
    );
  }

  selectRandomProperty() {
    const properties = Object.keys(Animal.properties);
    const index = Math.floor(Math.random() * properties.length);
    return properties[index];
  }

  render() {
    return (
      <GameComponent
        {...this.state}
        title={this.props.title}
        play={this.play}
      />
    );
  }
}
