import detalleFacturaDTO from "../../application/DTO/detalleFacturaDTO.js";
import detalleFacturaInputPort from "../../application/ports/input/detalleFacturaInput.js";

export default class detalleFacturaController extends detalleFacturaInputPort {
    constructor(detalleFacturaCommandUseCase, detalleFacturaQueryUseCase) {
        super();
        this.detalleFacturaCommandUseCase = detalleFacturaCommandUseCase;
        this.detalleFacturaQueryUseCase = detalleFacturaQueryUseCase;
    }

    create = async (req, res) => {
        try {
            const dto = new detalleFacturaDTO(req.body);
            const result = await this.detalleFacturaCommandUseCase.create(dto);
            res.status(201).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    read = async (req, res) => {
        try {
            const result = await this.detalleFacturaQueryUseCase.read();
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    readById = async (req, res) => {
        try {
            const result = await this.detalleFacturaQueryUseCase.readById(req.params.id);
            if(!result) return res.status(404).json({ error: "No encontrado" });
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    update = async (req, res) => {
        try {
            const dto = new detalleFacturaDTO(req.body);
            const result = await this.detalleFacturaCommandUseCase.update(req.params.id, dto);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    patch = async (req, res) => {
        try {
            const dto = new detalleFacturaDTO(req.body); // Will have undefined for missing
            // Clean undefined from object so we only update sent fields
            Object.keys(dto).forEach(key => dto[key] === undefined && delete dto[key]);
            const result = await this.detalleFacturaCommandUseCase.patch(req.params.id, dto);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };

    delete = async (req, res) => {
        try {
            const result = await this.detalleFacturaCommandUseCase.delete(req.params.id);
            res.status(200).json({ estado: "ok", resultado: result });
        } catch(e) { res.status(500).json({ error: e.message }); }
    };
}
