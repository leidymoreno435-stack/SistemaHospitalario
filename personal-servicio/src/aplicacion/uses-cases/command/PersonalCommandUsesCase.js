import Personal from "../../../dominio/entidades/Personal.js";

export default class PersonalCommandUsesCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }
    async crear(dtoPersonal) {
        const id = Date.now().toString();
        const persona = new Personal(
            id,
            dtoPersonal.getNombre(),
            dtoPersonal.getApellido(),
            dtoPersonal.getIdentificacion(),
            dtoPersonal.getIdUsuario(),
            dtoPersonal.getIdSpecialty(),
            dtoPersonal.getTelefono(),
            dtoPersonal.getEmail(),
            dtoPersonal.getActivo(),
            dtoPersonal.getCreadoEn()
        );
        const result = await this.adaptadorBDSalida.guardar(persona);
        console.log('Ingreso al caso de uso');
        return {
            estado: "ok",
            resultado: result
        };
    }
    async eliminar(dtoPersonal) {
        const id = dtoPersonal.getId();
        const persona = new Personal(
            id,
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            false,
            ""
        );
        const result = await this.adaptadorBDSalida.eliminar(persona);
        console.log('Ingreso al caso de uso');
        return {
            estado: "ok",
            resultado: result.resultado
        };
    }
}