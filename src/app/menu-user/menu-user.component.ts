import { Component } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { UserModel } from '../model/UserModel';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrl: './menu-user.component.css'
})
export class MenuUserComponent {

  name = environment.name;
  id = environment.id;

  user: UserModel = new UserModel();
  idUser = environment.id

  constructor(
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.authService.refreshToken()
    console.log(this.authService)
  }

  sair(){
    this.router.navigate(['/login'])
    environment.token = ''
    environment.name = ''
    environment.id =  0
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: UserModel) => {
      this.user = resp

    })
  }

}
