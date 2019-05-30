import {Request, Response} from 'express';
import {Op} from 'sequelize';
import {Adventure} from 'tables/Adventure';
import {Tags} from 'tables/Tags';
import {URL} from 'url';

export async function list(_req: Request, res: Response) {
    // Const {staticBasePath} = res.locals;
    const adventures = await Adventure.scope('tags').findAll({
        limit: 2
    });
    res.json(adventures);
}

export async function chunk(_req: Request, res: Response) {
    // Const {staticBasePath} = res.locals;
    const params = getParamsInURL(new URL('https://' + _req.url));
    const adventures = await Adventure.scope('tags').findAll(params);
    res.json(adventures);
}

function getParamsInURL(url: URL) {
    const search = String(url.searchParams.get('search'));
    const arrTags = String(url.searchParams.get('arrTags')).split(' ');
    const limit = Number(url.searchParams.get('limit'));
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
        where: {
            [Op.or]: [
                {title: {[Op.iLike]: `%${search}%`}},
                {description: {[Op.iLike]: `%${search}%`}}
            ]
        }
    };

    return params;
}
