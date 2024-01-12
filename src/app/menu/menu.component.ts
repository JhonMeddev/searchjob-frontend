import { Component, OnInit } from '@angular/core';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AlertsService } from '../service/alerts.service';
import { VagaService } from '../service/vaga.service';
import { VagaModel } from '../model/VagaModel';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  userLogin: UsuarioLogin = new UsuarioLogin()

  vaga: VagaModel = new VagaModel();
  listVaga: VagaModel[];
  titleVaga: string


  constructor(
    public router: Router,
    public authService : AuthService,
    public vagaService: VagaService,
    private alerts: AlertsService
  ) { }


  ngOnInit(){
    window.scroll(0,0)

    this.vagaService.refreshToken()
    this.authService.refreshToken()

  }

}
