import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUserDTO, Users } from '../model/auth';
import { Observable, tap } from 'rxjs';
import { generateID } from '../../../utils/generateID';
import { TokenService } from '../../../core/service/token.service';

@Injectable()
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private token: TokenService) {}

  public registerUser(bodyDTO: CreateUserDTO): Observable<Users> {
    const body: Users = { id: generateID(), ...bodyDTO };
    return this.http
      .post<Users>(this.baseUrl, body)
      .pipe(tap(() => this.token.saveToken('123456')));
  }

  public login(email: string, password: string): Observable<Users[]> {
    return this.http
      .get<Users[]>(`${this.baseUrl}?email=${email}&user=${password}`)
      .pipe(tap(() => this.token.saveToken('123456')));
  }

  public logout(): Observable<Users[]> {
    return this.http
      .get<Users[]>(`${this.baseUrl}`)
      .pipe(tap(() => this.token.deleteToken()));
  }
}
