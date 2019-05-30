import {Request, Response} from 'express';

import {Op} from 'sequelize';
import slug from 'slug';
import {Adventure} from 'tables/Adventure';
import {Tags} from 'tables/Tags';

export async function filterTags(req: Request, res: Response) {
    const {hash} = req.params;
    const {meta, staticBasePath} = res.locals;
    const result = await Tags.findOne({
        include: [
            {
                include: [
                    {
                        model: Tags
                    }
                ],
                model: Adventure
            }
        ],
        where: {
            hashEN: hash
        }
    });
    const {adventures} = result!;
    const data = {
        adventures,
        hash: result!.hash,
        meta,
        staticBasePath
    };
    if (adventures) {
        res.render('index', data);
    } else {
        res.sendStatus(404);
    }
}

export async function getAllTags(_req: Request, _res: Response) {
    const fiendTags = slug(decodeURIComponent(_req.url.replace('/hashtags?fiendTags=', '')));
    const result = await Tags.findAll({
        where: {
            hashEN: {[Op.like]: `%${fiendTags}%`}
        }
    });

    _res.json(result);
}
