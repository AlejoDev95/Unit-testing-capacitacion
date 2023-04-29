import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { defer, of } from 'rxjs';

import { generateManyMovies } from './../../../../mock/movie.mock';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieListComponent } from './movies-list.component';

describe('Movie List Component', () => {
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

  it('should return a list of images from the service', () => {
    const listOfMovesMock = generateManyMovies(4);
    const totalOfPreviousMovies = component.movieList.length;
    movieService.getAll.and.returnValue(of(listOfMovesMock));

    component.loadMoreMovies();
    fixture.detectChanges();
    const listOfMovies: DebugElement[] = fixture.debugElement.queryAll(
      By.css('app-movie-card')
    );
    const expectedIamge: DebugElement = fixture.debugElement.query(
      By.css('app-movie-card img')
    );

    expect(component.movieList.length).toBe(
      listOfMovesMock.length + totalOfPreviousMovies
    );

    expect(listOfMovies.length).toBe(
      listOfMovesMock.length + totalOfPreviousMovies
    );

    expect(expectedIamge.nativeElement.src).toContain(
      component.movieList[0].image
    );
  });

  it('should return a list of images from the service when the "load more" button is clicked', fakeAsync(() => {
    const listOfMovesMock = generateManyMovies(10);
    const totalOdPrevious = component.movieList.length;
    const buttonLoadMore = fixture.debugElement.query(
      By.css('button[data-id="load-more"]')
    );
    movieService.getAll.and.returnValue(defer(() => of(listOfMovesMock)));

    buttonLoadMore.triggerEventHandler('click');
    tick();
    fixture.detectChanges();

    const listOfMovies: DebugElement[] = fixture.debugElement.queryAll(
      By.css('app-movie-card')
    );

    const expectedIamge: DebugElement = fixture.debugElement.query(
      By.css('app-movie-card img')
    );

    expect(component.movieList.length).toBe(
      listOfMovesMock.length + totalOdPrevious
    );

    expect(listOfMovies.length).toBe(listOfMovesMock.length + totalOdPrevious);

    expect(expectedIamge.nativeElement.src).toContain(
      component.movieList[0].image
    );
  }));

  it('should changes the status of loading to success', fakeAsync(() => {
    const listOfMovesMock = generateManyMovies(8);
    movieService.getAll.and.returnValue(
      defer(() => Promise.resolve(listOfMovesMock))
    );

    component.loadMoreMovies();
    fixture.detectChanges();

    const status: HTMLElement = fixture.debugElement.query(
      By.css('div[data-id="status"]')
    ).nativeElement;

    expect(status.textContent).toBe('Loading');
    expect(component.status).toBe('loading');

    tick();
    fixture.detectChanges();

    const listOfMovies = fixture.debugElement.queryAll(
      By.css('app-movie-card')
    );

    expect(listOfMovies.length).toBeGreaterThan(1);
    expect(component.status).toBe('success');
  }));

  it('should changes the status of loading to success when the "load more" button is clicked', fakeAsync(() => {
    const listOfMovesMock = generateManyMovies(8);
    const buttonLoadMore = fixture.debugElement.query(
      By.css('button[data-id="load-more"]')
    );

    movieService.getAll.and.returnValue(
      defer(() => Promise.resolve(listOfMovesMock))
    );

    buttonLoadMore.triggerEventHandler('click');
    fixture.detectChanges();

    const status: HTMLElement = fixture.debugElement.query(
      By.css('div[data-id="status"]')
    ).nativeElement;

    expect(status.textContent).toBe('Loading');
    expect(component.status).toBe('loading');

    tick();
    fixture.detectChanges();

    const listOfMovies = fixture.debugElement.queryAll(
      By.css('app-movie-card')
    );

    expect(listOfMovies.length).toBeGreaterThan(1);
    expect(component.status).toBe('success');
  }));

  it('should changes the status of loading to error', fakeAsync(() => {
    movieService.getAll.and.returnValue(defer(() => Promise.reject('Error')));

    component.loadMoreMovies();
    fixture.detectChanges();

    let status: HTMLElement = fixture.debugElement.query(
      By.css('div[data-id="status"]')
    ).nativeElement;

    expect(status.textContent).toBe('Loading');
    expect(component.status).toBe('loading');

    tick(4000);
    fixture.detectChanges();

    status = fixture.debugElement.query(
      By.css('div[data-id="status"]')
    ).nativeElement;

    const listOfMovies = fixture.debugElement.queryAll(
      By.css('app-movie-card')
    );

    expect(listOfMovies.length).toBeUndefined;
    expect(status.textContent).toBe('Error while loading the list');
    expect(component.status).toBe('error');
  }));

  it('should changes the status of loading to error when the "load more" button is clicked', fakeAsync(() => {
    const buttonLoadMore = fixture.debugElement.query(
      By.css('button[data-id="load-more"]')
    );

    movieService.getAll.and.returnValue(defer(() => Promise.reject('Error')));

    buttonLoadMore.triggerEventHandler('click');
    fixture.detectChanges();

    let status: HTMLElement = fixture.debugElement.query(
      By.css('div[data-id="status"]')
    ).nativeElement;

    expect(status.textContent).toBe('Loading');
    expect(component.status).toBe('loading');

    tick(4000);
    fixture.detectChanges();

    status = fixture.debugElement.query(
      By.css('div[data-id="status"]')
    ).nativeElement;

    const listOfMovies = fixture.debugElement.queryAll(
      By.css('app-movie-card')
    );

    expect(listOfMovies.length).toBeUndefined;
    expect(status.textContent).toBe('Error while loading the list');
    expect(component.status).toBe('error');
  }));
});
