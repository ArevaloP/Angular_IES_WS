import { JdbcConexion } from './jdbc-conexion';
import { AtributoCompuesto } from './atributo-compuesto';

export class DetalleEquivalencia
{
    public id: String;
    public idAtributoEquiv: String;
    public valorOrigen: String;
    public nombreOrigen: String;
    public valorEquivalente: String;
    public nombreEquivalencia: String;
    public ip: String;
    public usuarioRealiza: String;
    public registradoPor: String;
    public conexionJdbcVO: JdbcConexion;
    public nombreEntidad: String;
    public esAutomatico: String;
    public indice: String;
    public esCompuesto: String;
    public listadoCompuesto: AtributoCompuesto[];
}