import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MovieService } from './movie.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { generateManyMovies } from 'src/app/mock/movie.mock';
import { TokenService } from '../../../core/service/token.service';
import { HTTP_INTERCEPTORS, HttpStatusCode } from '@angular/common/http';
import { TokenInterceptor } from '../../../core/interceptor/token.interceptor';
import { generateOneMovie } from '../../../mock/movie.mock';
import { CreateMovieDTO, UpdateMovieDTO } from '../models/movies';

describe('Movie Service', () => {
  let movieService: MovieService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;
  const baseUrl = 'http://localhost:3000/movies';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
      imports: [HttpClientTestingModule],
    });

    movieService = TestBed.inject(MovieService);
    tokenService = TestBed.inject(TokenService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be create', () => {
    expect(movieService).toBeTruthy();
  });

  describe('getAll Method', () => {
    it('should return a movie list', doneFn => {
      const mockData = generateManyMovies();

      movieService.getAll().subscribe(listOfMovies => {
        expect(listOfMovies).toEqual(mockData);
        expect(listOfMovies.length).toBe(mockData.length);
        expect(listOfMovies.length).not.toBe(50);
        doneFn();
      });

      const httpMock = httpController.expectOne(baseUrl);
      httpMock.flush(mockData);
    });

    it('should use the GET verb', () => {
      const mockData = generateManyMovies();
      movieService.getAll().subscribe();

      const httpMock = httpController.expectOne(baseUrl);
      expect(httpMock.request.method).toBe('GET');
      httpMock.flush(mockData);
    });

    it('Authorization and Content-type must be included in the headers', () => {
      const mockData = generateManyMovies();
      const token = '123456';
      spyOn(tokenService, 'getToken').and.returnValue(token);
      movieService.getAll().subscribe();

      const httpMock = httpController.expectOne(baseUrl);
      const header = httpMock.request.headers;
      expect(header.get('Authorization')).toBe(`Bearer ${token}`);
      expect(header.get('Authorization')).not.toBe('Bearer asdf');
      expect(header.get('Content-type')).toBe('application/json');
      httpMock.flush(mockData);
    });

    it('Page and Limit must be included in the params', () => {
      const mockData = generateManyMovies();
      const page = 1;
      const limit = 10;
      const url = `${baseUrl}?_page=${page}&_limit=${limit}`;

      movieService.getAll(page, limit).subscribe();

      const httpMock = httpController.expectOne(url);
      const params = httpMock.request.params;
      expect(params.get('_limit')).toBe(`${limit}`);
      expect(params.get('_page')).toBe(`${page}`);
      httpMock.flush(mockData);
    });

    it('should handle HttpErrorResponse with status code 400', doneFn => {
      const messageError = 'bad request';
      const mockError = {
        status: HttpStatusCode.BadRequest,
        statusText: messageError,
      };

      movieService.getAll().subscribe({
        error: error => {
          expect(error).toContain('Algo salio mal desde el front');
          doneFn();
        },
      });

      const httpMock = httpController.expectOne(baseUrl);
      httpMock.flush(messageError, mockError);
    });

    // TODO: Manera de como probar peticiones cuando se usa el pipe rety
    xit('should handle HttpErrorResponse with status code 400', fakeAsync(() => {
      const retryCount = 4;
      const messageError = 'bad request';
      const mockError = {
        status: HttpStatusCode.BadRequest,
        statusText: messageError,
      };

      movieService.getAll().subscribe({
        error: error => {
          expect(error).toContain('Algo salio mal desde el front');
        },
      });

      for (let index = 0; index < retryCount; index += 1) {
        const request = httpController.expectOne(baseUrl);
        request.flush(messageError, mockError);
        tick();
      }
    }));
  });

  describe('create Method', () => {
    it('should return a new Movie', doneFn => {
      const mockData = generateOneMovie();
      const movieDTO: CreateMovieDTO = {
        category: 'Animation',
        description: 'test description',
        image: 'image.png',
        releaseDate: '2023/04/18',
        title: 'New Movie',
      };

      movieService.create({ ...movieDTO }).subscribe(movie => {
        expect(movie).toEqual(mockData);
        doneFn();
      });

      const httpMock = httpController.expectOne(baseUrl);
      // Forma de probar los body en las peticiones post o put
      // expect(httpMock.request.body).toEqual(movieDTO);
      expect(httpMock.request.method).toBe('POST');
      httpMock.flush(mockData);
    });
  });

  describe('update Method', () => {
    it('should return a Movie updated', doneFn => {
      const id = '1';
      const mockData = generateOneMovie();
      const movieDTO: UpdateMovieDTO = { category: 'Animation' };

      movieService.update(id, { ...movieDTO }).subscribe(movie => {
        expect(movie).toEqual(mockData);
        doneFn();
      });

      const httpMock = httpController.expectOne(`${baseUrl}/${id}`);
      // Forma de probar los body en las peticiones post o put
      // expect(httpMock.request.body).toEqual(movieDTO);
      expect(httpMock.request.method).toBe('PUT');
      httpMock.flush(mockData);
    });
  });

  describe('delete Method', () => {
    it('should delete one movie', doneFn => {
      const id = '1';
      const mockData = generateOneMovie();

      movieService.delete(id).subscribe(movie => {
        expect(movie).toEqual(mockData);
        doneFn();
      });

      const httpMock = httpController.expectOne(`${baseUrl}/${id}`);
      expect(httpMock.request.method).toBe('DELETE');
      httpMock.flush(mockData);
    });
  });
});
