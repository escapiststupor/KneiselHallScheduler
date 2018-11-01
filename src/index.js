import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash/throttle';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './App';
import { saveState, loadState } from './utils';
import * as serviceWorker from './serviceWorker';

const persistedState = loadState();

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 5000)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
