import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { UserModel } from '../model/UserModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  entrar(usuarioLogin: UsuarioLogin):Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>('http://localhost:8080/usuarios/logar', usuarioLogin)
  }

  cadastrar(userModel: UserModel): Observable<UserModel>{
    return this.http.post<UserModel>('http://localhost:8080/usuarios/cadastrar', userModel)
  }

  getByIdUser(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`http://localhost:8080/usuarios/${id}`, this.token)
  }

  atualizar(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>('http://localhost:8080/usuarios/atualizar', user, this.token)
  }


  logado(){
    let ok: boolean = false

    if(environment.token != ''){
      ok = true
    }

    return ok
  }

  nome(){
    let nome: string = ''
    let nomeOk : any = environment.name

    if (nomeOk != '' ) {
      nome = nomeOk
    }
    return nome
  }

  tipo(){
    let tipo: string = ''
    let tipoOk : any = environment.userType

    if (tipoOk != '' ) {
      tipo = tipoOk
    }
    return tipo
  }
}
