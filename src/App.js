import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import createLogger from 'redux-logger';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Wireless from './containers/Wireless/Wireless';
import wirelessReducer from './redux/wireless';

// TODO and WYLO .... Figure out how the app is currently working, then write unit tests for feature request #1.

let store = createStore(
    combineReducers({
        wireless: wirelessReducer,
        form: formReducer,
    }),
    applyMiddleware(createLogger())
);

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
            <MuiThemeProvider>
              <div className="App">
                <Wireless />
              </div>
            </MuiThemeProvider>
        </Provider>
    );
  }
}

export default App;
