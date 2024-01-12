import { Component } from '@angular/core';
import { VagaModel } from '../model/VagaModel';
import { UserModel } from '../model/UserModel';
import { environment } from '../environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { VagaService } from '../service/vaga.service';
import { AlertsService } from '../service/alerts.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class MyPostsComponent {

  vaga: VagaModel = new VagaModel();
  listVagasUser: VagaModel[];
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
    this.getAllVagasUser(this.idUser)

  }

  getAllVagasUser(idUser: number) {
    this.vagaService.getVagasByIdUser(idUser).subscribe((resp: VagaModel[]) => {
      this.listVagasUser = resp;
    });
  }

  apagarVaga(id: number): void{

    console.log(`Excluir item com ID: ${id}`);

  }

}
