import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie';
import { ConfigService } from 'src/app/services/config.service';
import { MovieService } from 'src/app/services/movie.service';
import { errorFlush, getItems } from 'src/app/store/movie/MovieActions';
import { selecError, selecItems } from 'src/app/store/movie/MovieReducer';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  cols: any[] = this.config.movieColumns;
  list$: Observable<Movie | Movie[]> | any = new Observable();
  error$ = this.store.pipe( select(selecError)).pipe(
    tap( error => {
      const to = setTimeout(() => {
        clearTimeout(to);
        this.store.dispatch(errorFlush())
      }, 3000);
    })
  );

  constructor(
    private config: ConfigService,
    private movieService: MovieService,
    private store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getItems());
    this.list$ = this.store.pipe(select(selecItems));
  }

}
