import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-token-session',
  templateUrl: './token-session.component.html',
  styleUrls: ['./token-session.component.scss']
})
export class TokenSessionComponent implements OnInit{


  constructor(private activatedRoute: ActivatedRoute) {



  }
  ngOnInit() {

    console.log("Va para token sesion !!!");
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
    });


  }


  /*
   CanActivate, CanActivateChild 
  constructor(private router: Router) {

    console.log("ruta al iniciar componente ==>",this.router.url); 
   }

  ngOnInit() {

    console.log("Va para token sesion !!!");
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    console.log("url__urlurl",url);
    return true;//this.checkLogin(url);
  }


  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }*/



}
