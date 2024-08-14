import { createStore } from 'redux';
import { carbonFootprintReducer } from './reducers';

const store = createStore(carbonFootprintReducer);

export default store;
