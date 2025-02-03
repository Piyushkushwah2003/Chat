import React from 'react';
import Route from './src/navigations/route';
import store from './src/redux/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};
export default App;
