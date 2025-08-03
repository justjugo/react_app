import React from 'react'
import { useState ,useEffect} from 'react'


const MovieCard = ({movie ,addToWishList,removeFromWishList,wishList}) => {

  const [liked, setliked] = useState(false);
  const {title, release_date, poster_path,vote_average,original_language } = movie
  const isliked = wishList.some((m) => m.id === movie.id);
  
  
  useEffect(() => {
    setliked(isliked);
  }, [isliked]);
  
  
    return (
    <div className='movie-card '>
      
      <img className='hover:scale-120 transition-all duration-300 cursor-pointer  ' src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : `/No-Poster.png`} alt={title} />
      <div className='mt-4'>
        <h3>{title}</h3>
        <div className='content relative '>
            <div className='rating '>
                <img src="../Rating.svg" alt="rating icon" />
                <span>•</span>
                <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                <span>•</span>
                <p >{original_language}</p>
                <span>•</span>
                <p>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                <div className='absolute top-0 right-0 cursor-pointer  ' onClick={() => {
                  
                  console.log(liked)
                  if(liked===false){
                    addToWishList(movie)
                    alert()
                    
                    
                  }else{
                    removeFromWishList(movie)
                    
                  }
                  setliked(!liked)
                  
                 
                  }}>
                   
                 {liked ? (
                 
                
                  <p className='scale-200 hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'>❤️</p>
                  
                  
                ): (
                  <p className='scale-100 hover:scale-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'> 🤍</p>

                ) }
                </div>
            </div>
        </div>
        
      </div>
   
    </div>
  )
}

export default MovieCard