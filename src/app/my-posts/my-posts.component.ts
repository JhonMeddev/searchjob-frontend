import { Component, ElementRef, ViewChild } from '@angular/core';
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

  test: any = undefined;

  @ViewChild('novoPostButton') novoPostButton!: ElementRef;

  tituloEdit: string = '';
  descricaoEdit: string = '';

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
    this.vagaService.deleteVaga(id).subscribe(()=>{
      this.alerts.showAlertInfo('Vaga apada com sucesso');
      this.getAllVagasUser(this.idUser)
    })

  }

  publicar(){

    this.user.id = this.idUser
    this.vaga.anunciante = this.user

    console.log("Vaga : ")
    console.log(this.test)

    this.vagaService.postVaga(this.vaga).subscribe({ next: (resp: VagaModel) => {
      this.vaga = resp
      this.alerts.showAlertSuccess('Vaga postada com sucesso!')
      this.vaga = new VagaModel()
      this.getAllVagasUser(this.idUser);
    },
    error: erro => {
      if(erro.status == 500){
        this.alerts.showAlertDanger('Há algo de errado com sua postagem, porfavor revise')
        console.log(this.userLogin)
      }
      if(erro.status == 400){
        this.alerts.showAlertDanger('Há algo de errado com sua postagem, porfavor revise')
        console.log(this.userLogin)
      }
      if(erro.status == 401){
        this.alerts.showAlertDanger('Postagem não autorizada')
      }},})
  }

  editar(id: number){

    this.vagaService.getVagaById(id).subscribe({next: (resp: VagaModel) => {
      this.vaga = resp
      this.abrirModal();
    },
    error: erro => {
      if(erro.status == 500){
        this.alerts.showAlertDanger('Há algo de errado com a vaga')

      }
      if(erro.status == 400){
        this.alerts.showAlertDanger('Há algo deu errado')

      }
      if(erro.status == 401){
        this.alerts.showAlertDanger('Edição não autorizada')
      }},})
  }

  updateVaga(){
    this.vaga.titulo = this.tituloEdit;
    this.vaga.descricao = this.descricaoEdit;

    this.vagaService.editVaga(this.vaga).subscribe({next: (resp: VagaModel) => {
      this.vaga = resp
      this.getAllVagasUser(this.idUser);
    },
    error: erro => {
      if(erro.status == 500){
        this.alerts.showAlertDanger('Há algo de errado com a vaga')

      }
      if(erro.status == 400){
        this.alerts.showAlertDanger('Há algo deu errado')

      }
      if(erro.status == 401){
        this.alerts.showAlertDanger('Edição não autorizada')
      }},})

  }

    
  abrirModal(): void {
    const button = this.novoPostButton.nativeElement;
    if (button) {
      button.click();
    }
  }


}
