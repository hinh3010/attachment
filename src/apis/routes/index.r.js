import express from 'express';
import attachmentRouter from './attachment.r';

let routeV1 = express.Router();

routeV1.use('/attachment', attachmentRouter)


export default routeV1;