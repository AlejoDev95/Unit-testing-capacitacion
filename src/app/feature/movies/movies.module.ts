import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MoviesRoutingModule } from './movies-routing.module';
import { MovieService } from './services/movie.service';

import { MoviesComponent } from './movies.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieRegisterComponent } from './pages/movie-register/movie-register.component';
import { MovieListComponent } from './pages/movies-list/movies-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    MoviesComponent,
    MovieDetailsComponent,
    MovieRegisterComponent,
    MovieCardComponent,
    HeaderComponent,
    MovieListComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [MovieService],
})
export class MoviesModule {}
