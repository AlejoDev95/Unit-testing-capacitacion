import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../models/movies';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
})
export class MovieCardComponent {
  @Input()
  public movie!: Movie;

  constructor(private router: Router) {}

  public verDetalles() {
    this.router.navigate(['movies/details', this.movie.id]);
  }
}
