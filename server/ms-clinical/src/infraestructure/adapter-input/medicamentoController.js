import medicamentoDTO from "../../application/DTO/medicamentoDTO.js";
import medicamentoInputPort from "../../application/ports/input/medicamentoInput.js";

export default class medicamentoController extends medicamentoInputPort {
    constructor(medicamentoCommandUseCase, medicamentoQueryUseCase) {
        super();
        this.medicamentoCommandUseCase = medicamentoCommandUseCase;
        this.medicamentoQueryUseCase = medicamentoQueryUseCase;
    }

    create = async (req, res) => {
        try {
            const dto = new medicamentoDTO(req.body);
            const result = await this.medicamentoCommandUseCase.create(dto);
            res.status(201).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    read = async (req, res) => {
        try {
            const result = await this.medicamentoQueryUseCase.read();
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    readById = async (req, res) => {
        try {
            const result = await this.medicamentoQueryUseCase.readById(req.params.id);
            if(!result) return res.status(404).json({ error: "No encontrado" });
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    update = async (req, res) => {
        try {
            const dto = new medicamentoDTO(req.body);
            const result = await this.medicamentoCommandUseCase.update(req.params.id, dto);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    patch = async (req, res) => {
        try {
            const dto = new medicamentoDTO(req.body); // Will have undefined for missing
            // Clean undefined from object so we only update sent fields
            Object.keys(dto).forEach(key => dto[key] === undefined && delete dto[key]);
            const result = await this.medicamentoCommandUseCase.patch(req.params.id, dto);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    delete = async (req, res) => {
        try {
            const result = await this.medicamentoCommandUseCase.delete(req.params.id);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };
}
