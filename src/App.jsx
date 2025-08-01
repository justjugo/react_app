import React, { use, useEffect, useState } from 'react'
import { useDebounce, useStartTyping } from 'react-use';
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { fetchPopularMovies, updateSearchCount } from './appwrite';

//api key and base url 
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY =import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + API_KEY,
  }
}


const App = () => {
  //state variables 
  const [searchTerm, setsearchTerm] = useState('')
  const [error, seterror] = useState('')
  const [movies, setmovies] = useState([])
  const [loading, setloading] = useState(false)
  const [debounceSearch, setdebounceSearch] = useState()
  const [trendingMovies, settrendingMovies] = useState([])

  //debounce the search term to avoid making too many requests
  // by waiting for the user to stop typing for a certain amount of time
  useDebounce(() => {
    setdebounceSearch(searchTerm)
  }, 1000, [searchTerm])
  
  
  //fetch movies from the api
  const fetchMovies = async (query='') => {
    try {
      const endPoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endPoint, API_OPTIONS)

      //check if the response is ok 
      if(!response.ok) throw new Error("something went wrong")    
      const data = await response.json()

      //check if the response is valid
      if(data.response === 'False') {
        seterror(data.error || 'something went wrong')
        setmovies([])
        return;
      } 
      //update the state variables with the fetched data
        setmovies(data.results || []) 
        seterror('')
        setloading(false)
        if(query && data.results.length >0)
        {
          updateSearchCount(query,data.results[0])
        
        }
        fetchPopularMovies()
      
      
    } catch (error) {
      console.log(error)
      seterror("error fetching movies, please try again later")
      
    }finally{
      setloading(false)
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await fetchPopularMovies()
      settrendingMovies(movies)
      
    } catch (error) {
      console.log(error)
      
    }
  }

  //use effect to fetch movies when the search term changes
  useEffect(() => {
    fetchMovies(debounceSearch)
  }, [debounceSearch])

  useEffect(() => {
    loadTrendingMovies()
  }, [])

  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src="./hero-image.png" alt="Hero Pattern"  />
          <h1>find <span className='text-gradient'>Movies</span> You Will Enjoy Without The Hassle </h1>
        <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} /> 
        
        </header>
        {
          trendingMovies.length > 0 && (
            <section className='trending'>
            <h2 className='mt-20'>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index +1}</p>
                  <img src={movie.posterUrl} alt={movie.searchTerm} />
                  <p>{movie.searchTerm}</p>
                  

                </li>

              ))}</ul>
              </section>
          )
        }
       <section className='all-movies'>
        <h2 >All Movies</h2>
        {loading ? 
        (
          <Spinner />
        ): error ? (
          <p className='text-red-500'>{error}</p>
        ) :(
          <ul>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />

            ))}
          </ul>
        )} 
       </section>
        
        

      </div>
    </main>
  )
}

export default App