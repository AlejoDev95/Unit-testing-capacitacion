import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movies';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
})
export class MovieListComponent implements OnInit {
  public movieList: Movie[] = [];
  public limit = 4;
  public page = 1;
  public status: 'init' | 'error' | 'loading' | 'success' = 'init';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMoreMovies();
  }

  public loadMoreMovies(): void {
    this.status = 'loading';
    this.movieService.getAll(this.page, this.limit).subscribe({
      next: movieList => {
        this.movieList = [...this.movieList, ...movieList];
        this.page++;
        this.status = 'success';
      },
      error: () => {
        setTimeout(() => {
          this.movieList = [];
          this.status = 'error';
        }, 3000);
      },
    });
  }

  public getInfoText(): string {
    if (
      this.status === 'init' ||
      this.status === 'loading' ||
      this.status === 'success'
    ) {
      return 'Loading';
    }

    return 'Error while loading the list';
  }
}
