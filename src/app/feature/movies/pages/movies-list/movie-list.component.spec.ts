import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgOptimizedImage } from '@angular/common';
import { of } from 'rxjs';
import { generateManyMovies } from './../../../../mock/movie.mock';
import { MovieService } from '../../services/movie.service';
import { MovieListComponent } from './movies-list.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

fdescribe('Movie List Component', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieService: jasmine.SpyObj<MovieService>;

  beforeEach(() => {
    const movieServiceSpy = jasmine.createSpyObj(MovieService, ['getAll']);
    fixture = TestBed.configureTestingModule({
      declarations: [MovieListComponent, MovieCardComponent],
      imports: [NgOptimizedImage],
      providers: [
        {
          provide: MovieService,
          useValue: movieServiceSpy,
        },
      ],
    }).createComponent(MovieListComponent);
  });

  beforeEach(() => {
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    movieService.getAll.and.returnValue(of(generateManyMovies()));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
