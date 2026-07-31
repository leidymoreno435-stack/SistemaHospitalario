import patientDTO from "../../application/DTO/patientDTO.js";
import patientInputPort from "../../application/ports/input/patientInput.js";
import patientFilter from "../../domain/filters/patientFilter.js";

// Función auxiliar para desempaquetar 'resultado' anidado si viene de capas inferiores
const desempaquetar = (data) => {
    let actual = data;
    while (actual && typeof actual === 'object' && 'resultado' in actual && actual.resultado !== null) {
        actual = actual.resultado;
    }
    return actual;
};

export default class patientController extends patientInputPort {
    constructor(patientCommandUsesCase, patientQueryUsesCase) {
        super();
        this.patientCommandUsesCase = patientCommandUsesCase;
        this.patientQueryUsesCase = patientQueryUsesCase;
    }

    // CREATE
    create = async (req, res) => {
        try {
            const dto = new patientDTO(req.body);
            const result = await this.patientCommandUsesCase.create(dto);
            res.status(201).json({
                estado: "ok",
                resultado: result
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    };

    // READ 
    read = async (req, res) => {
        try {
            const result = await this.patientQueryUsesCase.read();
            res.status(200).json({
                estado: "ok",
                resultado: result
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    };

    readById = async (req, res) => {
        try {
            const result = await this.patientQueryUsesCase.readById(req.params.id);
            if (!result) return res.status(404).json({
                error: "No encontrado"
            });
            res.status(200).json({
                estado: "ok",
                resultado: result
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    };

    update = async (req, res) => {
        try {
            const dto = new patientDTO(req.body);
            const result = await this.patientCommandUsesCase.update(req.params.id, dto);
            res.status(200).json({
                estado: "ok",
                resultado: result
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    };

    patch = async (req, res) => {
        try {
            const dto = new patientDTO(req.body); // Will have undefined for missing
            // Clean undefined from object so we only update sent fields
            Object.keys(dto).forEach(key => dto[key] === undefined && delete dto[key]);
            const result = await this.patientCommandUsesCase.patch(req.params.id, dto);
            res.status(200).json({
                estado: "ok",
                resultado: result
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    };

    delete = async (req, res) => {
        try {
            const result = await this.patientCommandUsesCase.delete(req.params.id);
            res.status(200).json({
                estado: "ok",
                resultado: result
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    };
}