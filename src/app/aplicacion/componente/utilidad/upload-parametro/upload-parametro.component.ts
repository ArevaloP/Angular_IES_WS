import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestUploadFileService } from '../../../servicio/rest-upload-file.service';

@Component({
  selector: 'app-upload-parametro',
  templateUrl: './upload-parametro.component.html',
  styleUrls: ['./upload-parametro.component.scss']
})
export class UploadParametroComponent implements OnInit {

  public form: FormGroup;
  public error: string;
  public userId: number = 1;
  public uploadResponse = { status: '', message: '', filePath: '' };
  public imagePath;
  public imgURL: any;
  public message: string;
  public cambioFichero:boolean=false;

  public nombreFichero:String ="Seleccionar archivo ";


  constructor(public formBuilder: FormBuilder, public restUpload: RestUploadFileService) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      parametroFile: ['']
    });
  }



  public onFileChange(fx, event) {
      
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.vistaPreviaImagen(fx);
        this.form.get('parametroFile').setValue(file);
        this.subirArchivoAlServidor();
        this.cambioFichero=true;
        this.nombreFichero=file.name;
        //alert(this.cambioFichero);
      }

  }


  public subirArchivoAlServidor() {
    const formData = new FormData();
    formData.append('file', this.form.get('parametroFile').value);
    this.restUpload.cargarFicheroParametro(formData, this.userId).subscribe(
      data => {
        console.log("data::",data.data);
        this.uploadResponse.filePath = data.data;
      },
      (err) => this.error = err
    );

  }



  public vistaPreviaImagen(files) {
    this.message ="cargado ok";
  }


}
