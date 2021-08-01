import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { MovieService } from 'src/app/services/movie.service';
import { Observable, of } from 'rxjs';
import { getItems, getOneItem, LOAD_ITEMS, LOAD_SELECTED, ERROR_ITEM } from './MovieActions';
import { catchError, switchMap, withLatestFrom } from 'rxjs/operators';


@Injectable()
export class MovieEffect {

  constructor(
    private actions$: Actions,
    private movieService: MovieService,
    private store$: Store<any>,
  ) { }

  loadItems$ = createEffect((): Observable<Action> => {
    return this.actions$.pipe(
      ofType(getItems),
      switchMap(() => this.movieService.get()),
      switchMap(movies => of({ type: LOAD_ITEMS, items: movies })),
      catchError(error => of({ type: ERROR_ITEM, message: error }))
    );
  });

  getOneItem$ = createEffect((): Observable<Action> => {
    return this.actions$.pipe(
      ofType(getOneItem),
      withLatestFrom(this.store$),
      switchMap(([action, store]) => {
        const cache = store.movies?.items;
        let movie = null;
        if (cache && Array.isArray(cache)) {
          movie = cache.find((item) => item.id === action.id);
        }
        return movie ? of(movie) : this.movieService.get(action.id)
      }),
      switchMap(movie => of({ type: LOAD_SELECTED, selected: movie })),
      catchError(error => of({ type: ERROR_ITEM, error }))
    );
  });

};
