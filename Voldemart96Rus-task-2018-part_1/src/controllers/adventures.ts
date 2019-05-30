import {Request, Response} from 'express';

import {Adventure} from 'tables/Adventure';

export async function list(_req: Request, res: Response) {
    const {meta, staticBasePath} = res.locals;
    const adventures = await Adventure.scope('tags').findAll();
    const data = {
        adventures,
        meta,
        staticBasePath
    };
    res.render('index', data);
}
