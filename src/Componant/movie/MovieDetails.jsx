
import './Movie.css'; 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { langContext } from '../../Store/Context'; // Import langContext from your context file
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { changeCounter } from '../../Store/counterSlice';
import { Link } from 'react-router-dom';
export default function MovieDetails() {
    const { id } = useParams(); 
    const [MoviesArray, setMovies] = useState([]);
    const [FilteredMovies, setFilteredMovies] = useState([]);
    const [movieDetails, setMovieDetails] = useState({});
    const { lang, ChangeLang } = useContext(langContext); 


    const dispatch = useDispatch();
    const handleAddToFavorite = (movie) => {
        
        // const exists = favoriteMovies.map((favMovie) => favMovie.id).includes(movie.id);
        // if (exists) {
        //     alert('This movie already exists in favorites');
        // } else {
            dispatch(changeCounter(movie));
        // }
    };
    const fetchMovieDetails = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTlmMWRkYmNlMDM4NmY0YmUwY2RlNmM0MTA5YTNiNyIsInN1YiI6IjYzZjkxMmQ4ODRmMjQ5MDA4NjE0MzY3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gBI9D4KhPVEOTNZxHyPibMeY4INPm_6ZMTMqnBSEeV0'
                }
            });
            setMovieDetails(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    useEffect(() => {
      

        fetchMovieDetails();
       
    }, [id]);
    return (
        <div  dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {movieDetails ? (
                
               <div className="card card2 bg-light-subtle mt-4">
                   <img  src={'https://image.tmdb.org/t/p/w500/' + movieDetails.poster_path} alt={movieDetails.title} className="card-img-top" />
                   <div className="card-body" style={{paddingTop:'100px'}}>
                     <div className="text-section">
                       <h5 className="card-title fw-bold">{movieDetails.title}</h5>
                       <p className="card-tex overview">{movieDetails.overview}</p>
                       
                       <Link onClick={() => handleAddToFavorite(movieDetails)} className='btn btn-warning' to="/favorite">
                                         
                                       
                                         <i style={{ "color": "tomato", fontSize: '20px' }} className="fas fa-heart "></i>
                                         <span style={{ marginLeft: "10px", color: 'white' }}>Add To Favorite</span>
                                     </Link>
                     
                     </div>
                    
                   </div>
               </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
    
}
