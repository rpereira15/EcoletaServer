import express from 'express';
import itemsRoutes from './items';
import pointsRoutes from './points';

const routes = express.Router();

routes.use('/items', itemsRoutes)
routes.use('/points', pointsRoutes)

export default routes
