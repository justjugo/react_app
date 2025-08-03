import React from 'react'

const FavouriteMovies = ({wishList}) => {
  return (
    <div className='trending'>
        {wishList.length>0 && <h2>Favourite Movies</h2>}
        <ul className=''>{
             wishList.map((movie,index) => (

          
            <li className='text-white flex flex-col mt-20    ' key={movie.id}>
            
            <img className='justify-content hover:animate-bounce cursor-pointer' src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `/No-Poster.png`} alt={movie.title} />
            <h4 className='text-white font-bold line-clamp-1 text-base mt-2  '>{movie.title}</h4>

            </li>
         
            
        ))
        }</ul>

    </div>
         
    
     
    
  )
}

export default FavouriteMovies