import express from 'express';
import PointsController from './points.controller';

const routes = express.Router();
const pointsController = new PointsController();
routes.post('/', pointsController.create)
routes.get('/', pointsController.index)
routes.get('/:id', pointsController.show)

export default routes
