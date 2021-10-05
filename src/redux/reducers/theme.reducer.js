// Action types
import { SWITCH_THEME } from "@redux/actions/types/types";

const themeReducer = (state = { theme: null }, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      return { theme: action.theme };
    default:
      return state;
  }
};

export default themeReducer;
