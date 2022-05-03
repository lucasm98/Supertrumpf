import { legacy_createStore} from "redux";
import { composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "../reducers/rootReducer";

export function configureStore() {
  return legacy_createStore(rootReducer, composeWithDevTools());
}