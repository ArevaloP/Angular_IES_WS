import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestIpValidaService } from '../../../servicio/rest-ip-valida.service';
import { IpValida } from '../../../modelo/ipvalida';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';



@Component({
  selector: 'app-add-ipvalida',
  templateUrl: './add-ipvalida.component.html',
  styleUrls: ['./add-ipvalida.component.scss']
})
export class AddIpvalidaComponent implements OnInit {
  public fGeneral: FormGroup;
  public isModificar: boolean = false;
  public ipValida: IpValida = new IpValida();
  public listaIpValidas: IpValida[];
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));

  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  constructor(
    public fb: FormBuilder,
    public restIpValida: RestIpValidaService,
    public router: Router
  ) { }

  ngOnInit()
  {
    if ( this.restIpValida.getIpValida() != null )
    {
      this.ipValida = this.restIpValida.getIpValida();
      this.isModificar = true;
    }
    else {
      this.ipValida.estado = "ACTIVO";
      this.isModificar = false;
    }

    this.inicializarValidacion();
  }

  public inicializarValidacion()
  {
    this.ipValida.registradoPor = this.usuarioVO.oid;;
    this.ipValida.usuarioRealiza = this.usuarioVO.name;
    this.fGeneral = this.fb.group({
      ipValida: [this.ipValida.ipValida, [Validators.required,  Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      llaveOtra: [this.ipValida.llaveOtra, Validators.required],
      estado: [this.ipValida.estado, Validators.required]
      
    });
  }

  public irRegistar()
  {
    this.ipValida.registradoPor = this.usuarioVO.oid;
    this.ipValida.usuarioRealiza = this.usuarioVO.name;
    this.ipValida.generarLLaveNueva=true;

    if ( this.isModificar )
    {
      this.alerta.confirmarActualizar(
        ("¿Esta seguro de modificar la ip válida [" + this.ipValida.ipValida + "]?"),
        () => this.actualizarIpValida(this.ipValida)
      );
    }
    else {
      this.alerta.confirmarInsertar(
        ("¿Esta seguro de agregar la ip válida [" + this.ipValida.ipValida + "]?"),
        () => this.insertarIpValida(this.ipValida)
      );

    }

  }

  public insertarIpValida( ipValida )
  {
    this.restIpValida.insertarIpValida( ipValida ).subscribe(
      data => {
        this.router.navigate(['aplicacion/ip-valida/lis-ip-valida']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );

  }

  public actualizarIpValida( ipValida )
  {
    this.restIpValida.actualizarIpValida( ipValida ).subscribe(
      data => {
        this.router.navigate(['aplicacion/ip-valida/lis-ip-valida']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );

  }


 




}
