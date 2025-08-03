import React, { use, useEffect, useState } from 'react'
import { useDebounce, useStartTyping } from 'react-use';
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { fetchPopularMovies, updateSearchCount } from './appwrite';
import TrendingMovies from './components/TrendingMovies';
import FavouriteMovies from './components/FavouriteMovies';

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
  const [error, setError] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [debounceSearch, setDebounceSearch] = useState()
  const [trendingMovies, setTrendingMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [wishList, setwishList] = useState([])
  



  //debounce the search term to avoid making too many requests
  // by waiting for the user to stop typing for a certain amount of time
  useDebounce(() => {
    setPage(1) // Reset page to 1 for every new search
    setDebounceSearch(searchTerm)
  }, 1000, [searchTerm])
  
  

 


const addToWishList=(item)=>{
  setwishList((prevWishList) => {
    if (!prevWishList.some((wish) => wish.id === item.id)) {
      return [...prevWishList, item];
    }
  return prevWishList;
});

      
    
    
    console.log(wishList) 
  }


const removeFromWishList = (item) => {
  const newWishList = wishList.filter((wish) => wish.id !== item.id);
  setwishList(newWishList);
};


 useEffect(() => {
 
    
    const storedWishList = JSON.parse(localStorage.getItem("wishList")) || []
    
      setwishList(storedWishList)
      console.log(wishList)
      
    
  },[])

 useEffect(() => {
  console.log(wishList)
    localStorage.setItem('wishList', JSON.stringify(wishList))
}, [wishList])
  
  //fetch movies from the api
  const fetchMovies = async (query='') => {
    try {
      const endPoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`
      const response = await fetch(endPoint, API_OPTIONS)
      

      //check if the response is ok 
      if(!response.ok) throw new Error("something went wrong")    
      const data = await response.json();
      setTotalPages(data.total_pages);

      //check if the response is valid
      if(data.response === 'False') {
        setError(data.error || 'something went wrong');
        setMovies([]);
        return;
      } 
      //update the state variables with the fetched data
        setMovies(data.results || []);
        setError('');
        setLoading(false);
        if(query && data.results.length >0)
        {
          updateSearchCount(query,data.results[0])
        
        }
        fetchPopularMovies()
      
      
    } catch (error) {
      console.log(error)
      setError("error fetching movies, please try again later");
      
    }finally{
      setLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await fetchPopularMovies();
      setTrendingMovies(movies);
      
    } catch (error) {
      console.log(error)
      
    }
  }

  //use effect to fetch movies when the search term changes
  useEffect(() => {
    fetchMovies(debounceSearch)

  }, [debounceSearch,page])

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
         <FavouriteMovies wishList={wishList} />
        <TrendingMovies trendingMovies={trendingMovies} />
       
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
              <MovieCard 
               key={movie.id}
               movie={movie} 
               addToWishList={addToWishList} 
               removeFromWishList={removeFromWishList}
               wishList={wishList}
               

               />

            ))}
          </ul>
        )}
        <div className='flex items-center justify-center gap-8 my-8'>
          <button
            className='px-6 py-2 font-semibold text-white rounded-lg shadow-md transition-all duration-300 bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            ◀ Prev
          </button>
          <button
            className='px-6 py-2 font-semibold text-white rounded-lg shadow-md transition-all duration-300 bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
            onClick={() => setPage(prev => prev + 1)}
            disabled={page === totalPages}
          >
            Next ▶
          </button>
        </div>
       </section>
        
        

      </div>
    </main>
  )
}

export default App