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

}
