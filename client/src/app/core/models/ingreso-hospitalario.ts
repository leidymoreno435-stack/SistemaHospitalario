export interface IngresoHospitalario {
    id_ingreso?: number;
    id_paciente: number;
    id_cama: number;
    id_medico_responsable: number;
    fecha_ingreso: Date;
    fecha_alta?: Date;
    motivo_ingreso: string;
    estado: string;
    // Para display
    paciente_nombres?: string;
    paciente_apellidos?: string;
    medico_nombres?: string;
    medico_apellidos?: string;
    cama_numero?: number;
    habitacion_codigo?: string;
}