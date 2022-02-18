import React from 'react';
import logo from './logo.svg';
import './App.css';
import './MenuPrincipal/components/Main'
import MenuPrincipal from './MenuPrincipal/components/Main';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://127.0.0.1:8080/graphql",
  cache: new InMemoryCache,

});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <MenuPrincipal />
      </div>
    </ApolloProvider>
  );
}

export default App;
