import React,{useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import LoadingSpinner from './components/Loading/LoadingSpinner';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fethMoviesHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://swapi.dev/api/films/")
      const data = await response.json();
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
      setIsLoading(false);
    }
    catch (err) {
      console.log(err)
    }
  }
  


  return (
    <React.Fragment>
      <section>
        <button onClick={fethMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <LoadingSpinner/>}
        {/* {isLoading && <p>Loading....</p>} */}
        {!isLoading &&<MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
