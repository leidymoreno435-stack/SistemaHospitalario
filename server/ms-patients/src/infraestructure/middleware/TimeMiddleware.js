export const timeMiddleware = (req, res, next) => {
    console.log(`Estoy en el controlador con id: ${req.traceId}`);
    const inicio = Date.now();

    res.on('finish', () => {
        const duracion = Date.now() - inicio;
        console.log(`${req.traceId} tiempo: ${duracion} ms`);
    });

    next();
};