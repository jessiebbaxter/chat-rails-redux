/* eslint no-alert:off */

// external modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reduxPromise from 'redux-promise';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// internal modules
import App from './components/app';

// State and reducers
import messagesReducer from './reducers/messages_reducer';

// render an instance of the component in the DOM
const root = document.getElementById("root");
const initialStateChannels = JSON.parse(root.dataset.channels).map(c => c.name)

const initialState = {
  messages: [],
  channels: initialStateChannels,
};

const reducers = combineReducers({
  messages: messagesReducer,
  channels: (state = null) => state,
});

// Middlewares
const middlewares = applyMiddleware(reduxPromise, logger);
const store = createStore(reducers, initialState, middlewares);

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="channels/:channel" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);