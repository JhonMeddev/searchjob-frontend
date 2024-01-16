import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { Observable } from 'rxjs';
import { VagaModel } from '../model/VagaModel';


@Injectable({
  providedIn: 'root'
})
export class VagaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  getAllVagas(): Observable<VagaModel[]> {
    return this.http.get<VagaModel[]>('http://localhost:8080/vaga');
  }

  getVagasByIdUser(id: number): Observable<VagaModel[]> {
    return this.http.get<VagaModel[]>(`http://localhost:8080/vaga/mypost/${id}`)
  }

  postVaga(vaga: VagaModel): Observable<VagaModel>{
    return this.http.post<VagaModel>('http://localhost:8080/vaga/', vaga, this.token)
  }

  deleteVaga(id: number){
    return this.http.delete(`http://localhost:8080/vaga/${id}`, this.token)
  }

  getVagaById(id: number): Observable<VagaModel>{
    return this.http.get<VagaModel>(`http://localhost:8080/vaga/${id}`, this.token)
  }

  editVaga(vaga: VagaModel): Observable<VagaModel>{
    return this.http.put<VagaModel>(`http://localhost:8080/vaga/`, vaga, this.token)
  }

  getVagasByTitulo(titulo: string): Observable<VagaModel[]>{
    return this.http.get<VagaModel[]>(`http://localhost:8080/vaga/title/${titulo}`)
  }

}
