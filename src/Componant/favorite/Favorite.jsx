import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Favorite.css';
import { langContext } from '../../Store/Context'; 
import { useContext } from 'react';
import { removeFavoriteMovie } from '../../Store/counterSlice'; // Import the action creator

export default function Favorite() {
    const favoriteMovies = useSelector((state) => state.counter.favoriteMovies) || [];
    const dispatch = useDispatch(); // Initialize the useDispatch hook
    const { lang, ChangeLang } = useContext(langContext); 
    const handleRemove = (movieId) => {
        // Dispatch the removeFavoriteMovie action when the "Remove" button is clicked
        dispatch(removeFavoriteMovie(movieId));
    };

    return (
        < > 
            {favoriteMovies.map((movie, index) => (
                <div dir={lang === 'ar' ? 'rtl' : 'ltr'}  key={index} className="card card4 bg-dark-subtle mt-4">
                    <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} className="card-img-top" alt={movie.title} />
                    <div className="card-body">
                        <div className="text-section">
                            <h5 className="card-title fw-bold">{movie.title}</h5>
                            <p className="card-text">{movie.overview}</p>
                        </div>
                        <div className="cta-section">
                            <button onClick={() => handleRemove(movie.id)} className="btn btn-danger">Remove</button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
