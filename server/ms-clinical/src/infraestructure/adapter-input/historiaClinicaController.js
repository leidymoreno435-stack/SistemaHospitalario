import historiaClinicaDTO from "../../application/DTO/historiaClinicaDTO.js";
import historiaClinicaInputPort from "../../application/ports/input/historiaClinicaInput.js";

export default class historiaClinicaController extends historiaClinicaInputPort {
    constructor(historiaClinicaCommandUseCase, historiaClinicaQueryUseCase) {
        super();
        this.historiaClinicaCommandUseCase = historiaClinicaCommandUseCase;
        this.historiaClinicaQueryUseCase = historiaClinicaQueryUseCase;
    }

    create = async (req, res) => {
        try {
            const dto = new historiaClinicaDTO(req.body);
            const result = await this.historiaClinicaCommandUseCase.create(dto);
            res.status(201).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    read = async (req, res) => {
        try {
            const result = await this.historiaClinicaQueryUseCase.read();
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    readById = async (req, res) => {
        try {
            const result = await this.historiaClinicaQueryUseCase.readById(req.params.id);
            if(!result) return res.status(404).json({ error: "No encontrado" });
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    update = async (req, res) => {
        try {
            const dto = new historiaClinicaDTO(req.body);
            const result = await this.historiaClinicaCommandUseCase.update(req.params.id, dto);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    patch = async (req, res) => {
        try {
            const dto = new historiaClinicaDTO(req.body); // Will have undefined for missing
            // Clean undefined from object so we only update sent fields
            Object.keys(dto).forEach(key => dto[key] === undefined && delete dto[key]);
            const result = await this.historiaClinicaCommandUseCase.patch(req.params.id, dto);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    delete = async (req, res) => {
        try {
            const result = await this.historiaClinicaCommandUseCase.delete(req.params.id);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };
}
