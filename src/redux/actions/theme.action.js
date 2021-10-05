// Action types
import { SWITCH_THEME } from "@redux/actions/types/types";

export const switchTheme = (theme) => {
    return (dispatch) => {
        dispatch({
            type: SWITCH_THEME,
            theme: theme,
        });
    };
};
