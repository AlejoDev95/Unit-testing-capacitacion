import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movies';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
})
export class MovieListComponent implements OnInit {
  public movieList: Movie[] = [];
  public limit = 10;
  public page = 0;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMoreMovies();
  }

  public loadMoreMovies(): void {
    this.movieService.getAll(this.page, this.limit).subscribe(movieList => {
      this.movieList = [...this.movieList, ...movieList];
      this.page++;
    });
  }
}
