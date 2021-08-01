import { createReducer, on } from '@ngrx/store';
import { Movie } from 'src/app/models/movie';
import { errorFlush, errorItem, loadItems, loadSelected } from './MovieActions';

export interface State {
  [x: string]: any;
  movies: { items: Movie[], selected?: Movie | null, error: any};
}

export const initialState: State = {
  movies: { items: [], selected: null, error: null }
}

export const MovieReducer = createReducer(
  initialState,
  on(loadItems, (state, action) => ({
    ...state,
    items: action.items
  })),
  on(loadSelected, (state, action) => ({
    ...state,
    selected: action.selected
  })),
  on(errorItem, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(errorFlush, (state, action) => ({
    ...state,
    error: null
  }))
);

export const selecItems = (state: State) => state.movies.items;
export const selectOneItem = (state: State) => Object.assign({}, state.movies.selected);
export const selecError = (state: State) => state.movies.error?.error;
