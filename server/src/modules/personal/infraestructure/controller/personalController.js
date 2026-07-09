import personalModel from '../model/personalModel.js';

export const getPersonal = async (req, res, next) => {
    try {
        const data = await personalModel.findAll();
        res.status(200).json({ estado: 'ok', data });
    } catch (error) {
        next(error);
    }
};

export const getPersonalById = async (req, res, next) => {
    try {
        const data = await personalModel.findByPk(req.params.id);
        if (!data) return res.status(404).json({ estado: 'error', resultado: 'Personal no encontrado' });
        res.status(200).json({ estado: 'ok', data });
    } catch (error) {
        next(error);
    }
};

export const createPersonal = async (req, res, next) => {
    try {
        const newData = await personalModel.create(req.body);
        res.status(201).json({ estado: 'ok', data: newData });
    } catch (error) {
        next(error);
    }
};

export const updatePersonal = async (req, res, next) => {
    try {
        const updated = await personalModel.update(req.body, { where: { id_personal: req.params.id } });
        if (updated[0] === 0) return res.status(404).json({ estado: 'error', resultado: 'Personal no encontrado' });
        res.status(200).json({ estado: 'ok', resultado: 'Personal actualizado exitosamente' });
    } catch (error) {
        next(error);
    }
};

export const deletePersonal = async (req, res, next) => {
    try {
        const deleted = await personalModel.destroy({ where: { id_personal: req.params.id } });
        if (!deleted) return res.status(404).json({ estado: 'error', resultado: 'Personal no encontrado' });
        res.status(200).json({ estado: 'ok', resultado: 'Personal eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
};
