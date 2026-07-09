import patientModel from '../model/patientModel.js';

export const getPatients = async (req, res, next) => {
    try {
        const patients = await patientModel.findAll();
        res.status(200).json({ estado: 'ok', data: patients });
    } catch (error) {
        next(error);
    }
};

export const getPatientById = async (req, res, next) => {
    try {
        const patient = await patientModel.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ estado: 'error', resultado: 'Paciente no encontrado' });
        res.status(200).json({ estado: 'ok', data: patient });
    } catch (error) {
        next(error);
    }
};

export const createPatient = async (req, res, next) => {
    try {
        const newPatient = await patientModel.create(req.body);
        res.status(201).json({ estado: 'ok', data: newPatient });
    } catch (error) {
        next(error);
    }
};

export const updatePatient = async (req, res, next) => {
    try {
        const updated = await patientModel.update(req.body, { where: { id_paciente: req.params.id } });
        if (updated[0] === 0) return res.status(404).json({ estado: 'error', resultado: 'Paciente no encontrado' });
        res.status(200).json({ estado: 'ok', resultado: 'Paciente actualizado exitosamente' });
    } catch (error) {
        next(error);
    }
};

export const deletePatient = async (req, res, next) => {
    try {
        const deleted = await patientModel.destroy({ where: { id_paciente: req.params.id } });
        if (!deleted) return res.status(404).json({ estado: 'error', resultado: 'Paciente no encontrado' });
        res.status(200).json({ estado: 'ok', resultado: 'Paciente eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
};
