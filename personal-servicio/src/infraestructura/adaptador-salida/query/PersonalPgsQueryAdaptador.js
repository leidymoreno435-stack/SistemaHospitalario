import PersonalSalidaQueryPuerto from "../../../aplicacion/puertos/salida/PersonalSalidaQueryPuerto.js";
import PersonalFiltro from "../../../dominio/filtros/PersonalFiltro.js";
import PersonalTabla from '../../base-dato/orm/PersonalTabla.js'

export default class PersonalPgsQueryAdaptador extends PersonalSalidaQueryPuerto {
    lista = async(filtro = []) => {
        console.log('Listando la tabla persnal..')
        const where = {};
        filtro.forEach(esp => {
            if (esp instanceof PersonalFiltro) {
                if (esp.nombre)
                    where.usu_nombre = esp.nombre
            }
        });

        const usuarios = await usuarioTabla.findAll({ where });
        return {
            estado: "ok",
            resultado: usuarios
        }
    }
}