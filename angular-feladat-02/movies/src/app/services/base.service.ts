import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  entity: string = "";

  constructor(
    public config: ConfigService,
    public http: HttpClient,
    @Inject('entityName') collection: string,
  ) {
    this.entity = collection;
  }

  get(id?: string | number): Observable<T | T[]> {
    let url = `${this.config.apiUrl}${this.entity}`;
    if (id) {
      url += `/${id}`;
    }
    return this.http.get<T[]>(url);
  }

  query(queryString: string): Observable<T | T[]> {
    const url = `${this.config.apiUrl}${this.entity}?${queryString}`;
    return this.http.get<T[]>(url);
  }

  update(id: number | string, record: T): Observable<T> {
    const url = `${this.config.apiUrl}${this.entity}/${id}`;
    return this.http.put<T>(url, record);
  }
}
