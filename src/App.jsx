import React, { useEffect, useState } from 'react'
import Search from './components/Search'

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
  

  const fetchMovies = async () => {
    try {
      const endPoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endPoint, API_OPTIONS) 
      if(!response.ok) throw new Error("something went wrong")    
      const data = await response.json()

      if(data.response === 'False') {
        seterror(data.error || 'something went wrong')
        setmovies([])
        return;
      } 
        setmovies(data.results || [])
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
    fetchMovies()
  }, [])
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
        <h2>All Movies</h2>
        {loading ? 
        (
          <p className='text-white'>Loading ...</p>
        ): error ? (
          <p className='text-red-500'>{error}</p>
        ) :(
          <ul>
            {movies.map((movie) => (
              <p className='text-white' key={movie.id}>{movie.title}</p>

            ))}
          </ul>
        )} 
       </section>
        
        

      </div>
    </main>
  )
}

export default App