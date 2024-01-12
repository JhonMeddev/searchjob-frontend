import { Component } from '@angular/core';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { environment } from '../environments/environment.prod';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { AlertsService } from '../service/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userLogin: UsuarioLogin = new UsuarioLogin()

  constructor(private auth: AuthService, private router : Router, private alerts: AlertsService) { }

  ngOnInit(){
    window.scroll(0,0)
    environment.email = ''
    environment.id = 0
    environment.name = ''
    environment.token = ''
    environment.userType = ''   
  }


  entrar(){
    this.auth.entrar(this.userLogin).subscribe({
      next: (resp: UsuarioLogin)=>{

      this.userLogin = resp
      environment.token = this.userLogin.token
      environment.name = this.userLogin.name
      environment.email = this.userLogin.email
      environment.id = this.userLogin.id
      environment.userType = this.userLogin.tipo
    
      console.log(environment)
      this.router.navigate(['/home'])
      },
      error: erro => {
      if(erro.status == 500){
        this.alerts.showAlertDanger('Usuário ou senha estão incorretos')
        console.log(this.userLogin)
      }
      if(erro.status == 401){
        this.alerts.showAlertDanger('Usuário ou senha estão incorretos')
      }
    },
    });
  }

}
