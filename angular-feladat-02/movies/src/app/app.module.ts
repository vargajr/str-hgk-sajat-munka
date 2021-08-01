import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MovieEffect } from './store/movie/MovieEffects';
import { MovieReducer } from './store/movie/MovieReducer';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { EditorComponent } from './pages/editor/editor.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { MovieEditorComponent } from './pages/movie-editor/movie-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    EditorComponent,
    ForbiddenComponent,
    HomeComponent,
    LoginComponent,
    MovieEditorComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ movies: MovieReducer }),
    EffectsModule.forRoot([ MovieEffect ]),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
