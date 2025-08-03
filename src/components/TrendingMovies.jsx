import React from 'react'

const TrendingMovies = ({trendingMovies}) => {
  return (
    trendingMovies.length > 0 && (
            <section className='trending'>
            <h2 >Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li  key={movie.$id}>
                  <p>{index +1}</p>
                  <img src={movie.posterUrl} alt={movie.searchTerm} />
                 
                  

                </li>

              ))}</ul>
              </section>
          )
  )
}

export default TrendingMovies