


import { langContext } from '../../Store/Context'; // Import langContext from your context file
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { langContext } from '../../Store/Context'; // Import langContext from your context file
 import { useSelector } from 'react-redux';


export default function Navbar() {
  // Access lang and changeLang function from the language context
  let { counter } = useSelector((state) => state.counter);
  // Function to handle language change
  const { lang, ChangeLang } = useContext(langContext); 
  const handleLangChange = (e) => {
    const newLang = e.target.value;
    ChangeLang(newLang); // Call the changeLang function to change the language
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark " dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <a className="navbar-brand mx-5" href="#">MovieApp</a>
        <button className="navbar-toggler" type="button"
          data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Select dropdown for language */}
      

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            
            <li className="nav-item">
              <Link className="nav-link" to="movie">Movies</Link>
            </li>
          
            <li className="nav-item">
              <Link className="nav-link position-relative" to="favorite" >
                <i style={{ color: "tomato" }} className="fas fa-heart"></i> Favorites
                <span style={{ width: "21px", height: "21px", backgroundColor: 'tomato', top: '1px', left: '89px' }} className="position-absolute border border-light rounded-circle">
                  <p style={{marginTop:'-3px'}} className='text-center '>{counter}</p> {/* Render the value of 'counter' */}
                </span>
              </Link>
            </li>
            <li style={{marginLeft:"10px"}}   className="nav-item ">
              <Link className="nav-link" to="register">Register</Link>
            </li>
          </ul>
         
        </div>
        <select style={{width:'120px',marginRight:'20px'}} value={lang} onChange={handleLangChange} className="form-select  btn btn-danger">
        
          <option value="en">English</option>
          <option value="ar">Arabic</option>
        </select>
      </nav>
    </>
  );
}

