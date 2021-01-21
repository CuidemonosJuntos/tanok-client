import React, { useContext, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Context from './context';
import reducer from './reducer';
import Home from './components/Home';
import MyLearning from './components/MyLearning';

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://tanok-server.herokuapp.com/'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
 // console.log({ state });

  return (
      <Router>
        <ApolloProvider client={client}>
            <Context.Provider value={{ state, dispatch }}>
              <div className="App">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/mylearning" component={MyLearning} />
                </Switch>
              </div>
            </Context.Provider>
          </ApolloProvider>
      </Router>
  );
}

export default App;
