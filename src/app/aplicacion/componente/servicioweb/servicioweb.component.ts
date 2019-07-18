import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { RestUserWebService } from '../../servicio/rest-user-web.service';
declare var $;

@Component({
  selector: 'app-servicioweb',
  templateUrl: './servicioweb.component.html',
  styleUrls: ['./servicioweb.component.scss'],
})

//https://jsonplaceholder.typicode.com/users
export class ServiciowebComponent implements OnInit {

  listadoAplicacionExterna: any[];



  @ViewChild('dataTable') table;
  dataTable: any;
  constructor(private restUser: RestUserWebService) {
  }

  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    alert("");
    this.consultarServicio();
 }


  consultarServicio() {
    this.restUser.usuarios().subscribe(
      data => {
        this.listadoAplicacionExterna = data;

        this.dtOptions = {
          data: data,
          columns: [
            { title: 'User ID', data: 'id' },
            {title: 'First Name', data: 'userId'},
            { title: 'Last Name', data: 'title' }
          ],
          "paging": true,
          "ordering": true,
          "info": true
        };

        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable(this.dtOptions);
      },
      error => {
        alert("Error en la consultad de aplicaccin " + JSON.stringify(error));
      }
    );

  }





}
