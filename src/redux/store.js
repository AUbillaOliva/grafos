import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

// Themes
import { LightTheme } from "@constants/theme/theme";

// Reducers
import themeReducer from "@redux/reducers/theme.reducer";

const composedEnchancers = composeWithDevTools({ trace: true, traceLimit: 25 });

const persistThemeConfig = { key: "theme", storage };

const persistedThemeReducer = persistReducer(persistThemeConfig, themeReducer);

const middlewares =
    process.env.NODE_ENV !== "production"
        ? [require("redux-immutable-state-invariant").default(), thunk]
        : [thunk];

const store = createStore(
    combineReducers({ persistedThemeReducer }),
    {
        persistedThemeReducer: { theme: LightTheme },
    },
    composedEnchancers(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

export default store;
