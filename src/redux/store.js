import {createStore,applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
// import {composeWithDevTools} from "react-devtools-extension"
import rootReducer from "./rootReducer";
import {persistStore,persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage";


const persistConfig={
    key:'main-root',
    storage,
}
const persistedReducer=persistReducer(persistConfig,rootReducer)
const store = createStore(persistedReducer,composeWithDevTools());

const Persitor=persistStore(store);

export {Persitor}

export default store;