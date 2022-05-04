import { connect} from "react-redux";
import Form from './Form';
import { AppState} from "../../../reducers/rootReducer";
import {getCard} from "../../selectors/admin.selectors";

function mapStateToProps(state: AppState) {
  return {
    getAnimal: getCard(state),
  };
}

export default connect(mapStateToProps)(Form);