import React, { useState } from 'react';
import { langContext } from '../../Store/Context'; // Import langContext from your context file
import { useContext } from 'react';

export default function Search({movieArray,setFilteredMovies}) {

    const { lang, ChangeLang } = useContext(langContext); 
    const[searchTerm,setSearchTerm] = useState('')
    let getValue=()=>{
//get input value as title of movie
//filter data based on this title(data in movie.jsx)
const filteredMovies = movieArray.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredMovies(filteredMovies);
    }
  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="container mt-4 shadow p-4">
      <h3 className="text-center">Welcome to our Movie App</h3>
      <p className="text-center">Search for your favorite movies below:</p>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group d-flex justify-content-around">
            <input type="text" onChange={(e)=>setSearchTerm(e.target.value)} className="form-control" placeholder="Search for movies..." />
            <div className="input-group-append">
              <button  onClick={()=>{getValue()}} style={{marginLeft:'10px'}} className="btn btn-warning " type="button">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
