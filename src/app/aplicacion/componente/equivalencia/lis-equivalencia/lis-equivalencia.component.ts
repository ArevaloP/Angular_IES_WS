import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lis-equivalencia',
  templateUrl: './lis-equivalencia.component.html',
  styleUrls: ['./lis-equivalencia.component.scss']
})
export class LisEquivalenciaComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  cargarAgregar(){
    this.router.navigate(['aplicacion/equivalencia/add-equivalencia']);
  }

}
