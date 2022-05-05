import {AppState} from "../../reducers/rootReducer";
import { createSelector} from "reselect";
import Animal from "../../shared/models/Animal";

export function getCards(state: AppState): Animal[] {
  return state.admin.cards;
}

export function onlyFavourites(state: AppState): boolean {
  return state.admin.onlyFavourites;
}

export function getCard(state: AppState): (id?: number) => Animal {
  return (id?: number): Animal => {
    const animal = getCards(state).find(card => card.id === id);
    if(!animal) {
      return new Animal('', '', '', '', '', '', '');
    }
    return animal;
  };
}

export const getFavourites = createSelector(
  [getCards, onlyFavourites],
  (cards, onlyFavourites) => {
    if(onlyFavourites) {
      return cards.filter(card => card.favourite);
    }
    return cards;
  }
);