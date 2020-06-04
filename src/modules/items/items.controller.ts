import { Request, Response } from 'express';
import knex from '../../config/database.connection';

export default class ItemsController {

    async index(rreq: Request, res: Response) {
        return knex('items')
            .select('*')
            .then(items => {
                return res.json(items.map(item=>  {return {id: item.id, title: item.title, image_url: `http://localhost:3333/uploads/${item.image}`}}));
            })
            .catch(err => res.json(err))
    }

}
