import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../api/queries";
const MoviesList = () => {
    const { loading, error, data } = useQuery(GET_MOVIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
         <h1>Movie List</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.allMovies.map((movie) => (
          <div key={movie.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px', backgroundColor: '#6E7DAB' }}>
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

export default MoviesList;