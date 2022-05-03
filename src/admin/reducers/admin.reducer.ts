import Animal from "../../shared/models/Animal";
import cards from './cards';

export interface State {
  cards: Animal[];
}

export default function(state: State = { cards: cards}, action: any):State {
  switch (action.type) {
    default:
      return state;
  }
}