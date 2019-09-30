import { DetalleEquivalencia } from './detalle-equivalencia';

export class AtributoEquivalencia
{
    public id: String;
    public nombre: String;
    public entidad: String;
    public fechaCreacion: String;
    public descripcion: String;
    public idConexionJdbc: String;
    public ip: String;
    public usuarioRealiza: String;
    public registradoPor: String;
    public nOrigen: String;
    public vOrigen: String;
    public listaDetalles: DetalleEquivalencia[];
    public listaDetallesCompuestos: DetalleEquivalencia[];
    public tagNombreOrigen: String;
    public tagValorOrigen: String;
    public archivo: String;
}