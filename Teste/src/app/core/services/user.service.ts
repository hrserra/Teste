import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "http://localhost:5000/api/usuarios"

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post(this.url + "/Autenticacao", user);
  }
}
