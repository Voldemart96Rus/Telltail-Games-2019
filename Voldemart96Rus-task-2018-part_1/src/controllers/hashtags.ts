import {Request, Response} from 'express';

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
