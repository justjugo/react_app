import React from 'react'

const MovieCard = ({movie :{title, release_date, poster_path,vote_average,original_language }}) => {
  return (
    <div className='movie-card'>
      <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : `/No-Poster.png`} alt={title} />
      <div className='mt-4'>
        <h3>{title}</h3>
        <div className='content'>
            <div className='rating'>
                <img src="../Rating.svg" alt="rating icon" />
                <span>•</span>
                <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                <span>•</span>
                <p >{original_language}</p>
                <span>•</span>
                <p>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
            </div>
        </div>
        
      </div>
   
    </div>
  )
}

export default MovieCard