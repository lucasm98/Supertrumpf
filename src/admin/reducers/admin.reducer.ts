import update from "immutability-helper";
import Animal from "../../shared/models/Animal";
import cards from './cards';
import { DELETE, DeleteCardAction} from "../actions/admin.actions";

export interface State {
  cards: Animal[];
  onlyFavourites: boolean;
}

export default function(
  state: State = { cards: cards, onlyFavourites: false},
  action: DeleteCardAction
):State {
  switch (action.type) {
    case "DELETE":
      const filteredCards = state.cards.filter(
        card => card.id !== action.payload
      );
      return update(state, { cards: { $set: filteredCards}});
    default:
      return state;
  }
}