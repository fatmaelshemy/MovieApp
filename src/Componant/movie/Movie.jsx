import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Search from '../Search/Search';
import axios from 'axios';
import './Movie.css'; 
import { useDispatch } from 'react-redux';
import { changeCounter } from '../../Store/counterSlice';
import { langContext } from '../../Store/Context'; 
import { useContext } from 'react';

export default function Movie() {
    const [MoviesArray, setMovies] = useState([]);
    const [FilteredMovies, setFilteredMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(4); // Number of movies per page
    const dispatch = useDispatch();
    const { lang, ChangeLang } = useContext(langContext); 
    
    const option = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTlmMWRkYmNlMDM4NmY0YmUwY2RlNmM0MTA5YTNiNyIsInN1YiI6IjYzZjkxMmQ4ODRmMjQ5MDA4NjE0MzY3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gBI9D4KhPVEOTNZxHyPibMeY4INPm_6ZMTMqnBSEeV0'
        }
    };

    useEffect(() => {
        getMovies();
    }, [currentPage]);

    const getMovies = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/popular?language=en-US&page=${currentPage}`, option);
        setMovies(data.results);
        setFilteredMovies(data.results);
    };

    const handleAddToFavorite = (movie) => {
        dispatch(changeCounter(movie));
    };

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = FilteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <>
            <Search movieArray={MoviesArray} setFilteredMovies={setFilteredMovies} />
            <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="container my-5">
                <div className="row">
                    {currentMovies.length > 0 ?
                        currentMovies.map((movie) => (
                            <div className="wrapper col-md-3" key={movie.id}>
                                <div className="card card1">
                                    <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt={movie.title} />
                                    <div className="descriptions">
                                        <h3>{movie.title}</h3>
                                        <p>{movie.overview}</p>
                                        <button onClick={() => handleAddToFavorite(movie)} className='btn btn-warning'>
                                            <i style={{ "color": "tomato", fontSize: '20px' }} className="fas fa-heart "></i>
                                            <span style={{ marginLeft: "10px", color: 'white' }}>Add To Favorite</span>
                                        </button>
                                        <br />
                                        <br />
                                        <span className='date'> Release Date: {movie.release_date}</span>
                                        <Link to={`/movieDetails/${movie.id}`} className="btn cc">Details</Link>
                                    </div>
                                </div>
                            </div>
                        )) :
                        <div className="bg-danger vh-100 text-light d-flex justify-content-center align-items-center">
                            <i className='fa-solid fa-spinner fa-spin fs-1'></i>
                        </div>
                    }
                </div>
                <div className="pagination-buttons mt-3 text-center ">
                    <button onClick={handlePrevPage} className="btn btn-warning mr-2" disabled={currentPage === 1}>Previous</button>
                    <button onClick={handleNextPage} className="btn btn-warning ms-4">Next</button>
                </div>
            </div>
        </>
    );
}
