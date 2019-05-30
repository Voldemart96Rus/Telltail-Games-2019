import {Request, Response} from 'express';

import {Op} from 'sequelize';
import {Adventure} from 'tables/Adventure';
import {Tags} from 'tables/Tags';
import {URL} from 'url';

export async function list(_req: Request, res: Response) {
    const {meta, staticBasePath} = res.locals;
    const adventures = await Adventure.scope('tags').findAll({
        limit: 2
    });
    const data = {
        adventures,
        meta,
        staticBasePath
    };
    res.render('index', data);
}

export async function chunk(_req: Request, _res: Response) {
    const params = getParamsInURL(new URL('https://' + _req.url));
    const {staticBasePath} = _res.locals;
    const adventures = await Adventure.scope('tags').findAll(params);
    _res.json({adventures, staticBasePath});
}

function getParamsInURL(url: URL) {
    const search = String(url.searchParams.get('search'));
    const arrTags = String(url.searchParams.get('arrTags')).split(' ');
    const limit = Number(url.searchParams.get('limit'));
    const loadADV = Number(url.searchParams.get('loadADV'));
    let whereTags = {};
    if (arrTags[0] !== '') {
        whereTags = {
            hash: {[Op.in]: arrTags}
        };
    }

    const params = {
        include: [
            {
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
                model: Tags,
                where: whereTags
            }
        ],
        limit,
        offset: loadADV,
        where: {
            [Op.or]: [
                {title: {[Op.iLike]: `%${search}%`}},
                {description: {[Op.iLike]: `%${search}%`}}
            ]
        }
    };

    return params;
}
