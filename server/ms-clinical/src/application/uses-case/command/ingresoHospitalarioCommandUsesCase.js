export default class ingresoHospitalarioCommandUsesCase {
    constructor(ingresoHospitalarioCommandOutput) {
        this.ingresoHospitalarioCommandOutput = ingresoHospitalarioCommandOutput;
    }
    create(dtoIngresoHospitalario) { return this.ingresoHospitalarioCommandOutput.create(dtoIngresoHospitalario); }
    update(id, dtoIngresoHospitalario) { return this.ingresoHospitalarioCommandOutput.update(id, dtoIngresoHospitalario); }
    patch(id, dtoIngresoHospitalario) { return this.ingresoHospitalarioCommandOutput.patch(id, dtoIngresoHospitalario); }
    delete(id) { return this.ingresoHospitalarioCommandOutput.delete(id); }
}
