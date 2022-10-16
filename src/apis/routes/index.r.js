import express from 'express';
import jwtMdw from '../middlewares/jwt.mdw';
import attachmentRouter from './attachment.r';

let routeV1 = express.Router();

routeV1.use('/attachment', jwtMdw.verifyAccessToken, attachmentRouter)


export default routeV1;