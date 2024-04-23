import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import MasterLayout from './Componant/masterLayout/MasterLayout';
import Notfound from './Componant/notfound/Notfound';
 import Movie from './Componant/movie/Movie';
import MovieDetails from './Componant/movie/MovieDetails';
import Favorite from './Componant/favorite/Favorite';
import Register from './Componant/register/Register';

import LangContextProvider from './Store/Context';
import React, { Suspense } from 'react';
const movie =React.lazy(()=>import('../src/Componant/movie/Movie'))
const favorite =React.lazy(()=>import('../src/Componant/favorite/Favorite'))
const route = createBrowserRouter([
  {
    path: '',
    element: <MasterLayout />,
    children: [
      { path: '', element: <Movie /> }, 
      { path: 'movie', element: <Movie /> },
      { path: 'movieDetails/:id', element: <MovieDetails /> },
      { path: 'favorite', element: <Favorite/> },
      { path: 'register', element: <Register/> },
     
      { path: '*', element: <Notfound /> }
      
    ]
  }
]);

function App() {
  return (
    <Suspense fallback={ <div className="bg-danger vh-100 text-light d-flex justify-content-center align-items-center">
    <i className='fa-solid fa-spinner fa-spin fs-1'></i>
</div>}>
    <LangContextProvider>
    <RouterProvider router={route} />
    </LangContextProvider>
    </Suspense>
    
  );
}

export default App;
