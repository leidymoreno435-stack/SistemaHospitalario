import { randomUUID } from 'crypto';

export const traceMiddleWare = (req, res, next) => {
    const traceId = randomUUID();
    req.traceId = traceId;
    res.setHeader('X-Trace-Id', traceId);
    console.log("El id asignado " + traceId);
    next();
};