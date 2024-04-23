import { createSlice } from '@reduxjs/toolkit';

let counterSlice = createSlice({
  name: 'counter',
  initialState: {
    counter: 0,
    favoriteMovies: [],
  },
  reducers: {
    changeCounter: (state, action) => {
      state.counter++;
      // Push the new favorite movie to the array
      state.favoriteMovies.push(action.payload);
    },
    removeFavoriteMovie: (state, action) => {
      // Find the index of the movie with the given id
      const index = state.favoriteMovies.findIndex(movie => movie.id === action.payload);

      // If the movie is found, remove it from the array
      if (index !== -1) {
        state.favoriteMovies.splice(index, 1);
        state.counter--
      }
    },
  },
});

let counterReducer = counterSlice.reducer;

export const { changeCounter, removeFavoriteMovie } = counterSlice.actions; // Export action creators

export default counterReducer;
