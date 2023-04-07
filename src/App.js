import React,{useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  const fethMoviesHandler = () => {
    fetch("https://swapi.dev/api/films/").then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data.results)
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
      })
      .catch((err) => console.log(err));
  }
 
  


  return (
    <React.Fragment>
      <section>
        <button onClick={fethMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
