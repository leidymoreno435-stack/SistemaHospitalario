import clinicalModel from '../model/clinicalModel.js';
import patientModel from '../../patients/infraestructure/model/patientModel.js';
import personalModel from '../../personal/infraestructure/model/personalModel.js';

export const getConsultations = async (req, res, next) => {
    try {
        const data = await clinicalModel.findAll({
            include: [
                { model: patientModel, attributes: ['nombre', 'apellido', 'cedula'] },
                { model: personalModel, attributes: ['nombre', 'apellido', 'especialidad'] }
            ]
        });
        res.status(200).json({ estado: 'ok', data });
    } catch (error) {
        next(error);
    }
};

export const getConsultationById = async (req, res, next) => {
    try {
        const data = await clinicalModel.findByPk(req.params.id, {
            include: [patientModel, personalModel]
        });
        if (!data) return res.status(404).json({ estado: 'error', resultado: 'Consulta no encontrada' });
        res.status(200).json({ estado: 'ok', data });
    } catch (error) {
        next(error);
    }
};

export const createConsultation = async (req, res, next) => {
    try {
        const newData = await clinicalModel.create(req.body);
        res.status(201).json({ estado: 'ok', data: newData });
    } catch (error) {
        next(error);
    }
};

export const updateConsultation = async (req, res, next) => {
    try {
        const updated = await clinicalModel.update(req.body, { where: { id_consulta: req.params.id } });
        if (updated[0] === 0) return res.status(404).json({ estado: 'error', resultado: 'Consulta no encontrada' });
        res.status(200).json({ estado: 'ok', resultado: 'Consulta actualizada exitosamente' });
    } catch (error) {
        next(error);
    }
};

export const deleteConsultation = async (req, res, next) => {
    try {
        const deleted = await clinicalModel.destroy({ where: { id_consulta: req.params.id } });
        if (!deleted) return res.status(404).json({ estado: 'error', resultado: 'Consulta no encontrada' });
        res.status(200).json({ estado: 'ok', resultado: 'Consulta eliminada exitosamente' });
    } catch (error) {
        next(error);
    }
};
