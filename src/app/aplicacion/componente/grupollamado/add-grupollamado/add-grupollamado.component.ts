import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { GrupoLlamado } from '../../../modelo/grupo-llamado';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { RestGrupoLlamadoService } from '../../../servicio/grupo-llamado.service';
import { Router } from '@angular/router';
import { RestAplicacionService } from '../../../servicio/rest-aplicacion.service';
import { AplicacionExterna } from '../../../modelo/aplicacion-externa';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { UtilConstante } from '../../../modelo/util-contante';
import { ServicioWeb } from '../../../modelo/servicio-web';

@Component({
  selector: 'app-add-grupollamado',
  templateUrl: './add-grupollamado.component.html',
  styleUrls: ['./add-grupollamado.component.scss']
})
export class AddGrupollamadoComponent implements OnInit {

  public dataTable: any;
  public dtOptions: any = {};
  public fGeneral: FormGroup;
  public grupoLlamado: GrupoLlamado = new GrupoLlamado();
  public isModificar: boolean = false;
  public isNuevaConexion: boolean = false;
  public listaConexionesExistente: GrupoLlamado[];
  public indexConexion: number;
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));
  public listaAplicacionesExternas: AplicacionExterna[];
  public const: UtilConstante = new UtilConstante();
  public listaServicio: ServicioWeb[];

  @ViewChild("dataTable", null) table;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  constructor(
    public fb: FormBuilder,
    public restGrupoLlamado: RestGrupoLlamadoService,
    public restAplicacion: RestAplicacionService,
    public restServicioWeb: RestServicioWebService,
    public router: Router
  ) {

  }

  ngOnInit() {
    this.listaAplicacionesExternas = this.restAplicacion.getListaAplicaciones();

    if (this.restGrupoLlamado.getGrupoLlamado() != null) {
      this.grupoLlamado = this.restGrupoLlamado.getGrupoLlamado();
      this.isModificar = true;
      this.listarServiciosWeb( this.grupoLlamado.id );
    } else {
      this.isModificar = false;
      this.listarServiciosWeb( null );
    }
    
    this.inicializarValidacion();
  }

  public renderizarDataTableServicios( listaServicios )
  {
    this.listaServicio = listaServicios;

    this.dtOptions = {
      data: listaServicios,
      columns: [
        { title: '', defaultContent:'', orderable: false, className: "td-center" },
        { title: 'Código', data: 'codigo', width: "30%" },
        { title: 'Nombre', data: 'nombre', width: "60%" }
      ],
      language: {
        url: "assets/spanish.json"
      },
      paging: true,
      ordering: true,
      info: true,
      rowCallback: (row: any, dataRow: ServicioWeb, index: number) => {
        const self = this;
        index = row._DT_RowIndex;

        if (dataRow.checkeado)
        {
          $('td:eq(0)', row).html('<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id="serweb'+index+'" checked><label class="custom-control-label" for="serweb'+index+'"></label></div>');
        }
        else
          $('td:eq(0)', row).html('<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id="serweb'+index+'"><label class="custom-control-label" for="serweb'+index+'"></label></div>');
        
        $('td:eq(0)', row).unbind('change');
        $('td:eq(0)', row).bind('change', (e) => {
          this.marcarLista( index );
        });

        return row;
      }

    };

    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOptions);
  }

  public marcarLista( index )
  {
    this.listaServicio[ index ].checkeado = !this.listaServicio[ index ].checkeado;
  }

  public inicializarValidacion() {

    this.fGeneral = this.fb.group({
      codigo: [this.grupoLlamado.codigo, Validators.required],
      nombre: [this.grupoLlamado.nombre, Validators.required],
      aplicacion: [this.grupoLlamado.idAplicacion, Validators.required],
      estado: [this.grupoLlamado.estado, Validators.required],
      descripcion: [this.grupoLlamado.descripcion, Validators.required]

    });

  }

  public irRegistar()
  {
    this.grupoLlamado.registradoPor = this.usuarioVO.oid;
    this.grupoLlamado.usuarioRealiza = this.usuarioVO.name;

    if ( this.isModificar )
    {
      this.alerta.confirmarActualizar(
        ("¿Esta seguro de modificar el grupo llamado [" + this.grupoLlamado.nombre + "]?"),
        () => this.actualizarGrupoLlamado(this.grupoLlamado)
      );
    }
    else {
      this.alerta.confirmarInsertar(
        ("¿Esta seguro de agregar el grupo llamado [" + this.grupoLlamado.nombre + "]?"),
        () => this.insertarGrupoLlamado(this.grupoLlamado)
      );
    }
  }

  public insertarGrupoLlamado(grupoLlamado) {
    this.asociarServicios( grupoLlamado );
    this.restGrupoLlamado.insertarGrupoLlamado(grupoLlamado).subscribe(
      data => {
        this.router.navigate(['aplicacion/grupollamado/lis-grupollamado']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    )
  }


  public actualizarGrupoLlamado(grupoLlamado) {
    this.asociarServicios( grupoLlamado );
    this.restGrupoLlamado.actualizarGrupoLlamado(grupoLlamado).subscribe(
      data => {
        this.router.navigate(['aplicacion/grupollamado/lis-grupollamado']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );


  }

  public asociarServicios( grupoLlamado )
  {
    let listaServicios:ServicioWeb[] = [];

    if ( null != this.listaServicio )
    {
      this.listaServicio.forEach( (objetoServicio)=>{
        if ( objetoServicio.checkeado )
          listaServicios.push( objetoServicio );
      });

      if ( listaServicios.length > 0 )
        grupoLlamado.listaWebServiceVO = listaServicios;
    }
  }

  public listarServiciosWeb( idGrupo )
  {
    this.restServicioWeb.listarServicioWebPorGrupo( idGrupo ).subscribe(
      data => {
        this.renderizarDataTableServicios( data );
      },
      error => {
        //alert("Error en la consultad de aplicaccin " + JSON.stringify(error));
        this.alerta.mostrarError(error);
      }
    );
  }

}