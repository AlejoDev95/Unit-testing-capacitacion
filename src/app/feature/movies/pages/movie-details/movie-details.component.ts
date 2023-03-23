import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { map, Subscription, switchMap, tap } from 'rxjs';
import { MovieService as MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movies';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent implements OnInit {
  public movie: Movie = {
    id: '-1',
    title: '',
    releaseDate: '',
    image: '',
    description: '',
    category: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listenToDetailsMovie();
  }

  public goToBack = (): void => this.location.back();

  public goToEdit = (): Promise<boolean> =>
    this.router.navigateByUrl(`movies/register/${this.movie.id}`);

  public deleteMovie = (): Subscription =>
    this.movieService
      .delete(this.movie.id)
      .subscribe(() => this.router.navigateByUrl(`movies/list`));

  private listenToDetailsMovie(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((params: ParamMap) => params.get('id')),
        switchMap((id: string | null) => this.movieService.getOne(id || '')),
        tap(data => (this.movie = data))
      )
      .subscribe();
  }
}
