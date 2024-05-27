# Setting up graphQL in React

# Initial Setup

1. Create a React Project with Vite
2. Install ApolloClient and graphQL
3. Initialize Apollo Client and wrap application
4. Create api folder to store queries in organized location
5. Implement useQuery to ensure we successfully pull graphQL data into our application



- Creating a React Project with vite inside the `frontend` directory:

```
npm create vite@latest .
```

- Installing apollo client and graphql

```
npm install @apollo/client graphql
```


Go to your `main.jsx`:

- Import apollo client, provider, memorycache, and gql
```
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
```

- create a variable for the graphQL endpoint:

```
const base_url = 'http://localhost:8000/graphql/'
```

- Create a client that uses the base_url as our uri, and uses the memoryCache we imported:

```
const client = new ApolloClient({
  uri: base_url,
  cache: new InMemoryCache()
})
```

- Wrap your App with the client:

```
  <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>,
```

- Create a `queries.js` file inside `src/api/`

```
import { gql } from '@apollo/client';

export const GET_MOVIES = gql`
  query GetMovies {
    allMovies {
      id
      Title
      Rank
      Year
      Length
      Rating
    }
  }
`;

```


- Now we should be able to import our query, and use it with the `useQuery` hook.

Update your `App.jsx` to look like:

```
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from './api/queries';
function App() {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
    <h1>Movie List</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.allMovies.map((movie) => (
          <div key={movie.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
            <h2>{movie.Title}</h2>
            <p>Rank: {movie.Rank}</p>
            <p>Year: {movie.Year}</p>
            <p>Length: {movie.Length}</p>
            <p>Rating: {movie.Rating}</p>
          </div>
        ))}
        </div>
    </>
  )
}

export default App
```



# Checkpoint 2

Ok at this point if you run your frontend and backend and visit `http://localhost:5173/` you should see our graphQL data from the backend.