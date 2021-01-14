import { createStore, compose } from 'redux';
import RootReducer from './Reducers/RootReducer';

const store = createStore(RootReducer, compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;