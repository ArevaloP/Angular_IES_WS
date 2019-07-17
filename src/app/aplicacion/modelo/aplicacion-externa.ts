import { ServicioWeb } from './servicio-web';
import { UserWebService } from './user-web-service';

export class AplicacionExterna {

    public id:String;
    public codigo:String;
    public nombre:String;
    public descripcion:String;
    public urlAplicacion:String;
    public estado:String;
    public tipo:String;
    public ip:String;
    public usuarioRealiza:String;
    public registradoPor:String;
    public listaServicioWeb:ServicioWeb[];
    public listaUsuarioAplicacion:UserWebService[];
    

}
