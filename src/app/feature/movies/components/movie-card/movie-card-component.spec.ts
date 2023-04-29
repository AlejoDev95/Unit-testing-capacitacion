import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieCardComponent } from './movie-card.component';
import { generateOneMovie } from '../../../../mock/movie.mock';

describe('Movie Card Component', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let router: Router;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [MovieCardComponent],
      imports: [RouterTestingModule, NgOptimizedImage],
    }).createComponent(MovieCardComponent);
  });

  beforeEach(() => {
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.movie = generateOneMovie();
    component.movie.image = 'image.png';
    fixture.detectChanges();
  });

  it('should created', () => {
    expect(component).toBeTruthy();
  });

  it('should call the navigation method', () => {
    const card = fixture.debugElement.query(By.css('figure'));
    const spyRouter = spyOn(router, 'navigate');
    const spySeeDetails = spyOn(component, 'seeDetails');

    spySeeDetails.and.callThrough();
    card.triggerEventHandler('click');
    fixture.detectChanges();

    expect(spySeeDetails).toHaveBeenCalled();
    expect(spyRouter).toHaveBeenCalled();
  });

  it('should have the image assigned', () => {
    const img: HTMLElement = fixture.debugElement.query(
      By.css('img')
    ).nativeElement;

    expect(img.getAttribute('src')).toContain('image.png');
  });
});
