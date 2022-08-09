import { Component, OnInit, ViewChild } from '@angular/core';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { Router } from '@angular/router';
import { RestIpValidaService } from '../../../servicio/rest-ip-valida.service';
import { IpValida } from '../../../modelo/ipvalida';
import { UtilConstante } from '../../../modelo/util-contante';


@Component({
  selector: 'app-lis-ipvalida',
  templateUrl: './lis-ipvalida.component.html',
  styleUrls: ['./lis-ipvalida.component.scss']
})
export class LisIpvalidaComponent implements OnInit {


  @ViewChild("dataTable", null) table;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  public dataTable: any;
  public dtOptions: any = {}
  public listaIpValidas: IpValida[];
  public const: UtilConstante = new UtilConstante();
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));

  constructor(
    public restIpValida: RestIpValidaService,
    public router: Router
  ) { }

  ngOnInit() {
    this.restIpValida.setIpValida(null);
    this.listarListaIpValida();
  }

  public listarListaIpValida() {
    this.restIpValida.listarIpValida().subscribe(
      data => {
        this.listaIpValidas = data;
        this.establecerOpcionesDataTable(data);
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable(this.dtOptions);
      },
      error => {
        //alert("Error en la consultad de aplicaccin " + JSON.stringify(error));
        this.alerta.mostrarError(error);
      }
    );
  }

  public establecerOpcionesDataTable(data) {
    this.dtOptions = {
      data: data,
      columns: [
        { title: '', defaultContent: this.const.ICONO_VER, orderable: false, className: "td-center" },
        { title: 'Dirección', data: 'ipValida', width: "20%", className: "text-left" },
        { title: 'Host', data: 'llaveOtra', width: "20%", className: "text-left" },
        { title: 'Key', data: 'llavePublica', width: "50%", className: "text-left" },
        { title: 'Estado', data: 'estado', width: "10%", className: "text-center" },
        { title: '', defaultContent: this.const.ICONO_MODIFICAR, orderable: false, className: "td-center" },
        { title: '', defaultContent: this.const.ICONO_ELIMINAR, orderable: false, className: "td-center" }
      ],
      language: {
        url: "assets/spanish.json"
      },
      paging: true,
      ordering: true,
      info: true,
      order: [[2, 'asc']],
      dom: 'Bfrtip',
      buttons: [
        {
          text: `${this.const.ICONO_AGREGAR}`,
          className: `${this.const.CLASE_AGREGAR}`,
          action: () => {
            this.router.navigate(['aplicacion/ip-valida/add-ip-valida']);
          },
        },
        { extend: 'copy', "text": 'Export', className: `${this.const.CLASE_COPIAR}` },
        { extend: 'excel', "text": 'Export', className: `${this.const.CLASE_EXCEL}` }
      ],
      rowCallback: (row: any, dataRow: IpValida, index: number) => {
        const self = this;

        index = row._DT_RowIndex;

        $('td:eq(0)', row).unbind('click');
        $('td:eq(0)', row).bind('click', () => {
          self.modificar(index);
        });


        let keyInfo = "keyrow"+index+"";
        let textCelda3  ="<input type='text' class='keyinput' id='"+keyInfo+"' name='"+keyInfo+"' value='"+dataRow.llavePublica+"'/>" ;
            textCelda3 +="&nbsp;&nbsp;<i class='fa fa-clipboard fa-1_5x' title='Copiar'></i>";
        $('td:eq(3)', row).html(textCelda3);

        $('td:eq(3)', row).unbind('click');
        $('td:eq(3)', row).bind('click', () => {
           
          self.copyInputMessage(keyInfo);
        });



        $('td:eq(5)', row).unbind('click');
        $('td:eq(5)', row).bind('click', () => {
          self.modificar(index);
        });

        $('td:eq(6)', row).unbind('click');
        //if (dataRow.asociado != "1") {
        $('td:eq(6)', row).html(this.const.ICONO_ELIMINAR_ROJO);
        //}

        $('td:eq(6)', row).bind('click', () => {
          self.irEliminar(this.listaIpValidas[index]);
        });

        return row;
      },
      initComplete: (settings, json) => {
        this.cambiarEstiloBotones();
      }
    };
  }

  public modificar(index) {
    this.restIpValida.setIpValida(this.listaIpValidas[index]);
    this.router.navigate(['aplicacion/ip-valida/add-ip-valida']);
  }

  public irEliminar(listaIpValidas) {
    this.alerta.confirmarEliminar(
      ("¿Esta seguro de eliminar la ip valida [" + listaIpValidas.ipValida + "]?"),
      () => this.eliminar(listaIpValidas)
    );
  }

  public eliminar(listaIpValidas) {
    listaIpValidas.registradoPor = this.usuarioVO.oid;;
    this.restIpValida.eliminarIpValida(listaIpValidas).subscribe(
      data => {
        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(() =>
          this.router.navigate(['aplicacion/ip-valida/lis-ip-valida']));
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );
  }

  public cambiarEstiloBotones() {
    $(":button.buttons-copy").html(`${this.const.ICONO_COPIAR}`);
    $(":button.buttons-excel").html(`${this.const.ICONO_EXCEL}`);
    $(".dt-buttons").css("float", "left");
    $(".keyinput").css("width", "90%");
    $(".keyinput").css("border", "none");
  }


  copyInputMessage(id){
    console.log("id",id);
    let inputElement :any= document.getElementById(id);
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    alert("Llave publica copiada");
  }


}
