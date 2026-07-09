import billingModel from '../model/billingModel.js';
import patientModel from '../../../patients/infraestructure/model/patientModel.js';

export const getInvoices = async(req, res, next) => {
    try {
        const data = await billingModel.findAll({
            include: [{ model: patientModel, attributes: ['nombre', 'apellido', 'cedula'] }]
        });
        res.status(200).json({ estado: 'ok', data });
    } catch (error) {
        next(error);
    }
};

export const getInvoiceById = async(req, res, next) => {
    try {
        const data = await billingModel.findByPk(req.params.id, {
            include: [patientModel]
        });
        if (!data) return res.status(404).json({ estado: 'error', resultado: 'Factura no encontrada' });
        res.status(200).json({ estado: 'ok', data });
    } catch (error) {
        next(error);
    }
};

export const createInvoice = async(req, res, next) => {
    try {
        const newData = await billingModel.create(req.body);
        res.status(201).json({ estado: 'ok', data: newData });
    } catch (error) {
        next(error);
    }
};

export const updateInvoice = async(req, res, next) => {
    try {
        const updated = await billingModel.update(req.body, { where: { id_factura: req.params.id } });
        if (updated[0] === 0) return res.status(404).json({ estado: 'error', resultado: 'Factura no encontrada' });
        res.status(200).json({ estado: 'ok', resultado: 'Factura actualizada exitosamente' });
    } catch (error) {
        next(error);
    }
};

export const deleteInvoice = async(req, res, next) => {
    try {
        const deleted = await billingModel.destroy({ where: { id_factura: req.params.id } });
        if (!deleted) return res.status(404).json({ estado: 'error', resultado: 'Factura no encontrada' });
        res.status(200).json({ estado: 'ok', resultado: 'Factura eliminada exitosamente' });
    } catch (error) {
        next(error);
    }
};