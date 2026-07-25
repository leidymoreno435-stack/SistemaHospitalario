import usuarioSalidaQueryPuerto from "../../../aplicacion/puertos/salida/UsuarioSalidaQueryPuerto.js";
import UsuarioFiltro from "../../../dominio/filtros/UsuarioFiltro.js";
import usuarioTabla from '../../base-dato/orm/UsuarioTabla.js'

export default class UsuarioPgsQueryAdaptador extends usuarioSalidaQueryPuerto{
    lista = async (filtro = []) =>{
        console.log('Listando la tabla usuario..')
        const where = {};
        filtro.forEach(esp=>{
            if(esp instanceof UsuarioFiltro){
                if (esp.nombre)
                where.usu_nombre = esp.nombre
            }
        });
        
        const usuarios = await usuarioTabla.findAll({where});
        return {
            estado: "ok", 
            resultado: usuarios
        } 
    }
}