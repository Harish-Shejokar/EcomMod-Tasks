import React,{useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import LoadingSpinner from './components/Loading/LoadingSpinner';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [intervalID, setIntervalID] = useState(null);
  
  const fethMoviesHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://swapi.dev/api/film/")
      if (!response.ok) {
        throw new Error('somthing went wrong ...Retrying');
      }
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
    }
    catch (err) { 
     
      // console.log(err.message)
      // clearInterval(intervalID);
      setError(err.message);
      
      setIntervalID((prevId) => {
        console.log(prevId)
        clearInterval(prevId);
        const Id = setInterval(fethMoviesHandler, 5000);
        return Id;
      });
     
    }
    setIsLoading(false);
  }
  
  const fun = () => {
    console.log('done',intervalID)
    clearInterval(intervalID);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fethMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && !error && <MoviesList movies={movies} />}
        {movies.length === 0 && !error && <p>NO Movies Found</p>}
        {isLoading && <LoadingSpinner />}
        {error && (
          <div>
            <p>{error}</p>
            <button onClick={fun}>Cancel</button>
          </div>
        )}
        {/* {isLoading && <p>Loading....</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
