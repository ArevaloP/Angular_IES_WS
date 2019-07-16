import { Component, OnInit } from '@angular/core';
import { AplicacionExterna } from '../../../modelo/aplicacion-externa';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-app-externa',
  templateUrl: './add-app-externa.component.html',
  styleUrls: ['./add-app-externa.component.scss']
})
export class AddAppExternaComponent implements OnInit {


  public aplicacionExterna:AplicacionExterna=new AplicacionExterna();
  fGeneral: FormGroup;
  
  constructor(private fb: FormBuilder  ) {


   }

  ngOnInit() {
    this.inicializarValidacion();
  }


  public inicializarValidacion() {

    //console.log(this.fb);
    this.fGeneral = this.fb.group({
      codigo: [this.aplicacionExterna.codigo||'@', [Validators.required]]/*,
      nombre: [this.aplicacionExterna.nombre, Validators.required],
      urlAplicacion: [this.aplicacionExterna.urlAplicacion, Validators.required],*/
    }
    );

  }


  public registarAplicacionExterna(){


  }


}
