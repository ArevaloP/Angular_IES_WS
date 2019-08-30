import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestUploadFileService } from '../../../servicio/rest-upload-file.service';

@Component({
  selector: 'app-upload-libreria',
  templateUrl: './upload-libreria.component.html',
  styleUrls: ['./upload-libreria.component.scss']
})
export class UploadLibreriaComponent implements OnInit {

  public form: FormGroup;
  public error: string;
  public userId: number = 1;
  public uploadResponse = { status: '', message: '', filePath: '' };
  public imagePath;
  public imgURL: any;
  public message: string;
  public cambioFichero:boolean=false;




  constructor(public formBuilder: FormBuilder, public restUpload: RestUploadFileService) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      libreriaZip: ['']
    });
  }



  public onFileChange(fx, event) {
      
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.vistaPreviaImagen(fx);
        this.form.get('libreriaZip').setValue(file);
        this.subirArchivoAlServidor();
        this.cambioFichero=true;
        alert(this.cambioFichero);
      }

  }


  public subirArchivoAlServidor() {

    //alert("subirArchivoAlServidor");
    const formData = new FormData();
    formData.append('file', this.form.get('libreriaZip').value);
    this.restUpload.cargarFicheroLibreria(formData, this.userId).subscribe(
      data => {
        console.log("data::",data.data);
        this.uploadResponse.filePath = data.data;
      },
      (err) => this.error = err
    );

  }



  public vistaPreviaImagen(files) {

    this.message ="cargado ok";

    /*if (files.length === 0) {
      return;
    }*/

    //var mimeType = files[0].type;
    //if (mimeType.match(/image\/*/) == null) {
      //this.message = "Only images are supported.";
      //return;
    //}

    /*var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }*/

  }




}
