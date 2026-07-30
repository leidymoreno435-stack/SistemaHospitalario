import ingresoHospitalarioDTO from "../../application/DTO/ingresoHospitalarioDTO.js";
import ingresoHospitalarioInputPort from "../../application/ports/input/ingresoHospitalarioInput.js";

export default class ingresoHospitalarioController extends ingresoHospitalarioInputPort {
    constructor(ingresoHospitalarioCommandUseCase, ingresoHospitalarioQueryUseCase) {
        super();
        this.ingresoHospitalarioCommandUseCase = ingresoHospitalarioCommandUseCase;
        this.ingresoHospitalarioQueryUseCase = ingresoHospitalarioQueryUseCase;
    }

    create = async (req, res) => {
        try {
            const dto = new ingresoHospitalarioDTO(req.body);
            const result = await this.ingresoHospitalarioCommandUseCase.create(dto);
            res.status(201).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    read = async (req, res) => {
        try {
            const result = await this.ingresoHospitalarioQueryUseCase.read();
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    readById = async (req, res) => {
        try {
            const result = await this.ingresoHospitalarioQueryUseCase.readById(req.params.id);
            if(!result) return res.status(404).json({ error: "No encontrado" });
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    update = async (req, res) => {
        try {
            const dto = new ingresoHospitalarioDTO(req.body);
            const result = await this.ingresoHospitalarioCommandUseCase.update(req.params.id, dto);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    patch = async (req, res) => {
        try {
            const dto = new ingresoHospitalarioDTO(req.body); // Will have undefined for missing
            // Clean undefined from object so we only update sent fields
            Object.keys(dto).forEach(key => dto[key] === undefined && delete dto[key]);
            const result = await this.ingresoHospitalarioCommandUseCase.patch(req.params.id, dto);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    delete = async (req, res) => {
        try {
            const result = await this.ingresoHospitalarioCommandUseCase.delete(req.params.id);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };
}
