import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/User';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LogService } from 'src/app/core/services/log.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService,
    private logService: LogService,
    private snackBar: MatSnackBar,
    private routing: Router,
    private cookieService: CookieService) { }

  ngOnInit() {
  }

  btnLogin_Click() {
    this.userService.login(this.user).subscribe((data) => {
      // this.logService()
      this.cookieService.set("token", data.token, new Date(data.expiration));
      this.cookieService.set("email", this.user.email, new Date(data.expiration));
      this.logService.new(this.user, "Login efetuado com sucesso!").subscribe(() => {
        this.routing.navigateByUrl("consulta");
      });

    }, (error) => {
      if (error.status == 403) {
        this.logService.new(this.user, "Login inválido!").subscribe(() => {
          this.snack("E-mail/Senha inválidos!");
        });
      } else {
        this.snack("Servidor inacessível!");
      }
    })
  }

  snack(message) {
    this.snackBar.open(message, "", { duration: 5000 });
  }

}
