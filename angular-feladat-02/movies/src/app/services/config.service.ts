import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl = "http://localhost:3000/";

  navigation: {label: string, href: string}[] = [
    { label: 'Home', href: '' },
    { label: 'For Editor', href: '/editor' },
    { label: 'For Admin', href: '/admin' }
  ];
  
  movieColumns: {key: string, label: string}[] = [
    {key: 'id', label: '#'},
    {key: 'title', label: 'Title'},
    {key: 'genre', label: 'Genre'},
    {key: 'released', label: 'Released'},
  ];

  constructor() { }
}
