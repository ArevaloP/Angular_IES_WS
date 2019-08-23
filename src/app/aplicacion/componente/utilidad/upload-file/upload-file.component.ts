import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestUploadFileService } from '../../../servicio/rest-upload-file.service';



@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  public form: FormGroup;
  public error: string;
  public userId: number = 1;
  public uploadResponse = { status: '', message: '', filePath: '' };
  public imagePath;
  public imgURL: any;
  public message: string;
  public  cambioImagen:boolean=false;



  constructor(public formBuilder: FormBuilder, public restUpload: RestUploadFileService) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }



  public onFileChange(fx, event) {
      
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.vistaPreviaImagen(fx);
        this.form.get('avatar').setValue(file);
        this.subirArchivoAlServidor();
        this.cambioImagen=true;
      }

  }


  public subirArchivoAlServidor() {
      //public  subirArchivoAlServidor(callback) {
      const formData = new FormData();
      formData.append('file', this.form.get('avatar').value);
      this.restUpload.uploadAvatar(formData, this.userId).subscribe(
        data => {
          this.uploadResponse = data;
          //callback(data);
        },
        (err) => this.error = err
      );

  }



  public vistaPreviaImagen(files) {

    if (files.length === 0) {
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

  }




}
