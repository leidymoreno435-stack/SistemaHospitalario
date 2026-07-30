import detalleRecetaDTO from "../../application/DTO/detalleRecetaDTO.js";
import detalleRecetaInputPort from "../../application/ports/input/detalleRecetaInput.js";

export default class detalleRecetaController extends detalleRecetaInputPort {
    constructor(detalleRecetaCommandUseCase, detalleRecetaQueryUseCase) {
        super();
        this.detalleRecetaCommandUseCase = detalleRecetaCommandUseCase;
        this.detalleRecetaQueryUseCase = detalleRecetaQueryUseCase;
    }

    create = async (req, res) => {
        try {
            const dto = new detalleRecetaDTO(req.body);
            const result = await this.detalleRecetaCommandUseCase.create(dto);
            res.status(201).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    read = async (req, res) => {
        try {
            const result = await this.detalleRecetaQueryUseCase.read();
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    readById = async (req, res) => {
        try {
            const result = await this.detalleRecetaQueryUseCase.readById(req.params.id);
            if(!result) return res.status(404).json({ error: "No encontrado" });
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    update = async (req, res) => {
        try {
            const dto = new detalleRecetaDTO(req.body);
            const result = await this.detalleRecetaCommandUseCase.update(req.params.id, dto);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    patch = async (req, res) => {
        try {
            const dto = new detalleRecetaDTO(req.body); // Will have undefined for missing
            // Clean undefined from object so we only update sent fields
            Object.keys(dto).forEach(key => dto[key] === undefined && delete dto[key]);
            const result = await this.detalleRecetaCommandUseCase.patch(req.params.id, dto);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    delete = async (req, res) => {
        try {
            const result = await this.detalleRecetaCommandUseCase.delete(req.params.id);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };
}
