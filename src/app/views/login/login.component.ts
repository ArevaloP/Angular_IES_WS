import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestUserAuthService } from '../../aplicacion/servicio/rest-user-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {


  constructor(
    private router:Router,
    private authRest:RestUserAuthService
    ) { }


    ngOnInit() {
      
      //this.iniciarSession();
      if (this.authRest.isLoggedIn()) {
        this.router.navigate(['aplicacion/status']);
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

    /*if(resul){
      this.router.navigate(['aplicacion/status']);
    }else{
      this.router.navigate(['error']);
    }*/

  }




 }
