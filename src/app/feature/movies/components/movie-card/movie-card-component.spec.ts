import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { generateOneMovie } from '../../../../mock/movie.mock';

fdescribe('Movie Card Component', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [MovieCardComponent],
    }).createComponent(MovieCardComponent);
  });

  beforeEach(() => {
    component = fixture.componentInstance;
    component.movie = generateOneMovie();
    component.movie.image = 'image.png';
    fixture.detectChanges();
  });

  it('should created', () => {
    expect(component).toBeTruthy();
  });
});
