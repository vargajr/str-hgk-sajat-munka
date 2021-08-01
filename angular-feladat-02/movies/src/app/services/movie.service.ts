import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService extends BaseService<Movie> {

  entity = 'movies';

  constructor(
    public config: ConfigService,
    public http: HttpClient,
  ) {
    super(config, http, 'users');
  }
}
