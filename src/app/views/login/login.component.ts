import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestUserAuthService } from '../../aplicacion/servicio/rest-user-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {


  constructor(
    private router:Router,
    private authRest:RestUserAuthService
    ) { }


  ngOnInit() {

    if (this.authRest.isLoggedIn()) {
      this.router.navigate(['load']);
    } else {
      this.iniciarSession();
    }
  }
  

    public iniciarSession(){
      this.authRest.login(
          (resul)=>this.validacion(resul)
      );
    }


    public validacion(resul){
    }




 }
