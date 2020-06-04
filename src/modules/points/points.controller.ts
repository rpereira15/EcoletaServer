import { Request, Response } from 'express';
import knex from '../../config/database.connection';

export  default class PointsController {

    async index(req: Request, res: Response) {
        const {city, uf, items} = req.query;
        const parsedItems = String(items).split(',').map(item => Number(item.trim()))
        return knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*')
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => res.status(400).json(err))
    }


    async show(req: Request, res: Response) {
        const { id } = req.params;
        return knex('points').where('id', id).first()
            .then(point => {
                if(!point) {
                    return res.status(404).json({message: 'Point not found'})
                }

                return knex('items')
                    .join('point_items', 'items.id', '=', 'point_items.item_id')
                    .where('point_items.point_id', id)
                    .select('items.title')
                    .then(items => {
                        console.log(items)
                        return res.status(200).json({point, items})
                    } )
            })
            .catch(err => res.json(err));
    }


    async create(req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body;
        const point = {
            image: 'fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
        return knex.transaction((trx) => {
            return knex('points').insert(point)
                .transacting(trx)
                .then(new_point => {
                    return items.map((item_id: number) => {
                        return  {
                            item_id,
                            point_id: new_point[0]
                        }
                    })
                })
                .then(pointItems => {
                    console.log(pointItems);
                    return knex('point_items').insert(pointItems)
                        .transacting(trx)
                        .then(trx.commit)
                        .then(ok => res.json({...point, id: pointItems[0].point_id}))
                        .catch(err => {
                            trx.rollback();
                            res.json(err)
                        })
                })
                .catch(err => {
                    trx.rollback();
                    res.json(err)
                });
        })
            .catch(err => {
                console.log(err)
            });


    }
}
