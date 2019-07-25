import { Component, OnInit, Input } from '@angular/core';
import { UploadFileComponent } from '../../utilidad/upload-file/upload-file.component';
import { UserWebService } from '../../../modelo/user-web-service';

@Component({
  selector: 'app-perfil-usuariows',
  templateUrl: './perfil-usuariows.component.html',
  styleUrls: ['./perfil-usuariows.component.scss']
})
export class PerfilUsuariowsComponent implements OnInit {

  @Input() fileAvatar: UploadFileComponent;
  @Input() userWebService: UserWebService;
  constructor() { }

  ngOnInit() {
 
  }

}
