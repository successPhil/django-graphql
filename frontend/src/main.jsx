import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

// const base_url = `https://${import.meta.env.VITE_BASE_URL}/movies/`

///// local
const base_url = 'http://localhost:8000/graphql/'

const client = new ApolloClient({
  uri: base_url,
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>,
)
