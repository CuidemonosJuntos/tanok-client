import React, { useContext, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Context from './context';
import reducer from './reducer';
import Home from './components/Home';
import MyLearning from './components/MyLearning';

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";

const wsLink = new WebSocketLink({
  uri: "wss://http://tanok-server.herokuapp.com/",
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  link: wsLink,
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
