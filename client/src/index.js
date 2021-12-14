import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import './index.css';
import App from './App';
import App2 from './App2';
//import registerServiceWorker from './registerServiceWorker';
require('dotenv').config();

// ReactDOM.render(<App2 />, document.getElementById('root'));

//registerServiceWorker();


ReactDOM.render(
    <div>
      <Router>
        <Switch>
          <Route exact
                              path="/"
                              render={() => (
                                  <App />
                              )}/>
          <Route exact
                              path="/App2"
                              render={() => (
                                  <App2 />
                              )}/>
        </Switch>
      </Router>
    </div>,
    document.getElementById('root')
  );
  
  
