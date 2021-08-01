import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { getOneItem } from 'src/app/store/movie/MovieActions';
import { selectOneItem } from 'src/app/store/movie/MovieReducer';

@Component({
  selector: 'app-movie-editor',
  templateUrl: './movie-editor.component.html',
  styleUrls: ['./movie-editor.component.scss']
})
export class MovieEditorComponent implements OnInit {

  movie$: Observable<Movie> | null = null;
  movieID: number = 0;
  serverError = '';

  constructor(
    private movieService: MovieService,
    private ar: ActivatedRoute,
    private store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.movieID = parseInt(this.ar.snapshot.params.id, 10);
    this.store.dispatch(getOneItem({id: this.movieID}));
    this.movie$ = this.store.pipe(select(selectOneItem));
  }

  onSubmit(ngForm: NgForm): void {
    history.back();
  }

}
