import Specialty from "../../../domain/entities/specialty.js";

export default class SpecialtyCommandUseCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }

    async create(specialtyDTO) {
        // 1. Validación de campos obligatorios
        const nombre = specialtyDTO.getNombre();

        if (!nombre) {
            return {
                estado: "error",
                resultado: "El campo nombre es obligatorio."
            };
        }

        // 2. Creación de la Entidad de Dominio
        const specialty = new Specialty(
            null,
            nombre,
            specialtyDTO.getDescripcion()
        );

        // 3. Persistencia
        return await this.adaptadorBDSalida.create(specialty);
    }

    async update(specialtyDTO) {
        const id = specialtyDTO.getId_especialidad();

        if (!id) {
            return {
                estado: "error",
                resultado: "Se requiere el id_especialidad para actualizar el registro."
            };
        }

        const specialty = new Specialty(
            id,
            specialtyDTO.getNombre(),
            specialtyDTO.getDescripcion()
        );

        return await this.adaptadorBDSalida.update(specialty);
    }

    async delete(specialtyDTO) {
        const id = specialtyDTO.getId_especialidad();

        if (!id) {
            return {
                estado: "error",
                resultado: "Se requiere el id_especialidad para eliminar el registro."
            };
        }

        const specialty = new Specialty(id, null, null);

        return await this.adaptadorBDSalida.delete(specialty);
    }
}