import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/core/services/log.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  displayedColumns: string[] = ['id','dataHora','email','resultado'];
  dataSource;

  constructor(private logService : LogService,  private cookieService : CookieService) {
    this.logService.getFromEmail(this.cookieService.get("email")).subscribe((data) =>{
      this.dataSource = data;
    });
  }

  ngOnInit() {
  }

}
