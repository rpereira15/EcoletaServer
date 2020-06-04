import express from 'express';
 import ItemsController from './items.controller';

const routes = express.Router();
const itemsController = new ItemsController();

routes.get('/',  itemsController.index);

export default routes
