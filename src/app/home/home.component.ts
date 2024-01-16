import { Component, OnInit } from '@angular/core';
import { VagaModel } from '../model/VagaModel';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { VagaService } from '../service/vaga.service';
import { AlertsService } from '../service/alerts.service';
import { UserModel } from '../model/UserModel';
import { environment } from '../environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  vaga: VagaModel = new VagaModel();
  listVaga: VagaModel[];
  titleVaga: string

  user: UserModel = new UserModel();
  idUser = environment.id

  userLogin: UsuarioLogin = new UsuarioLogin()

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
    this.getAllVagas()

  }

  getAllVagas() {
    this.vagaService.getAllVagas().subscribe((resp: VagaModel[]) => {
      this.listVaga = resp;
    });
  }
  

  findByTitle(){

    if(this.titleVaga == ''){
      this.getAllVagas()
    }else{
      this.vagaService.getVagasByTitulo(this.titleVaga).subscribe((resp: VagaModel[])=> {
        this.listVaga = resp
      })
    }
  }
  
}
