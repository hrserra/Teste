import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Logs } from 'src/app/shared/model/logs';
import { User } from 'src/app/shared/model/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  url: string = "http://localhost:5000/api/logs/"

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  new(user: User, resultado: string) {
    let log: Logs = new Logs();
    log.email = user.email;
    log.resultado = resultado;
    log.dataHora = new Date();
    return this.http.post(this.url, log);
  }

  getFromEmail(){
    

    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get("token")
   });
    console.log(this.cookieService.get("token"));
    return this.http.get(this.url + this.cookieService.get('email'), { headers: reqHeader });
  }
}
