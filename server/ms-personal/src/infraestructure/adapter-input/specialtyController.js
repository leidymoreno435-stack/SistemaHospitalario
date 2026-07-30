import specialtyDTO from "../../application/DTO/specialtyDTO.js";
import specialtyInputPort from "../../application/ports/input/specialtyInput.js";

export default class specialtyController extends specialtyInputPort {
    constructor(specialtyCommandUseCase, specialtyQueryUseCase) {
        super();
        this.specialtyCommandUseCase = specialtyCommandUseCase;
        this.specialtyQueryUseCase = specialtyQueryUseCase;
    }

    create = async (req, res) => {
        try {
            const dto = new specialtyDTO(req.body);
            const result = await this.specialtyCommandUseCase.create(dto);
            res.status(201).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    read = async (req, res) => {
        try {
            const result = await this.specialtyQueryUseCase.read();
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    readById = async (req, res) => {
        try {
            const result = await this.specialtyQueryUseCase.readById(req.params.id);
            if(!result) return res.status(404).json({ error: "No encontrado" });
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    update = async (req, res) => {
        try {
            const dto = new specialtyDTO(req.body);
            const result = await this.specialtyCommandUseCase.update(req.params.id, dto);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    patch = async (req, res) => {
        try {
            const dto = new specialtyDTO(req.body); // Will have undefined for missing
            // Clean undefined from object so we only update sent fields
            Object.keys(dto).forEach(key => dto[key] === undefined && delete dto[key]);
            const result = await this.specialtyCommandUseCase.patch(req.params.id, dto);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    delete = async (req, res) => {
        try {
            const result = await this.specialtyCommandUseCase.delete(req.params.id);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };
}
