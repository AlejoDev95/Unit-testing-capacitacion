import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Movie, CreateMovieDTO, UpdateMovieDTO } from '../models/movies';
import { generateID } from '../../../utils/generateID';

@Injectable()
export class MovieService {
  private readonly baseUrl = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) {}

  public getAll(page?: number, limit?: number): Observable<Movie[]> {
    let params = new HttpParams();

    if (page !== undefined && limit !== undefined) {
      params = params.set('_page', page);
      params = params.set('_limit', limit);
    }

    return this.http.get<Movie[]>(this.baseUrl, { params }).pipe(
      // TODO: Se explica junto a fakeAsync y tick
      // retry(3),
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.BadRequest) {
          return throwError(
            () => `Algo salio mal desde el front ${error.message}`
          );
        }

        if (error.status === HttpStatusCode.InternalServerError) {
          return throwError(
            () => `Error interno en el servidor ${error.message}`
          );
        }

        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => `Pelicula no enconrtada ${error.message}`);
        }

        return throwError(() => `Algo salio mal ${error.message}`);
      })
    );
  }

  public getOne(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/${id}`);
  }

  public create(bodyDTO: CreateMovieDTO): Observable<Movie> {
    const body: Movie = { id: generateID(), ...bodyDTO };
    return this.http.post<Movie>(this.baseUrl, body);
  }

  public update(id: string, body: UpdateMovieDTO): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}/${id}`, body);
  }

  public delete(id: string): Observable<Movie> {
    return this.http.delete<Movie>(`${this.baseUrl}/${id}`);
  }
}
