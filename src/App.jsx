import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY =import.meta.env.VITE_TMDB_API_KEY;
console.log(API_KEY)
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + API_KEY,
  }
}


const App = () => {
  const [searchTerm, setsearchTerm] = useState('')
  const [error, seterror] = useState('')
  const [movies, setmovies] = useState([])
  const [loading, setloading] = useState(false)
  

  const fetchMovies = async (query='') => {
    try {
      const endPoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      //`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endPoint, API_OPTIONS) 
      if(!response.ok) throw new Error("something went wrong")    
      const data = await response.json()

      if(data.response === 'False') {
        seterror(data.error || 'something went wrong')
        setmovies([])
        return;
      } 
        setmovies(data.results || [])
        console.log(data)
        seterror('')
        setloading(false)
      
      
    } catch (error) {
      console.log(error)
      seterror("error fetching movies, please try again later")
      
    }finally{
      setloading(false)
    }
  }
  useEffect(() => {
    fetchMovies(searchTerm)
  }, [searchTerm])
  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src="./hero-image.png" alt="Hero Pattern"  />
          <h1>find <span className='text-gradient'>Movies</span> You Will Enjoy Without The Hassle </h1>
        <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} /> 
         <h1 className='text-white'>{searchTerm}</h1>
        </header>
        
       <section className='all-movies'>
        <h2 className='mt-20'>All Movies</h2>
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