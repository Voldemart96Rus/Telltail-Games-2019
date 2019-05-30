import {Request, Response} from 'express';

import {Achievements} from 'tables/Achievements';
import {Action} from 'tables/Action';
import {Adventure} from 'tables/Adventure';
import {Scene} from 'tables/Scene';

export async function adventurePlayground(req: Request, res: Response) {
    const url = new URL('https://' + req.url);
    const n = String(url.searchParams.get('scene'));
    const advName = String(url.searchParams.get('adv'));
    const result = await Adventure.scope('action').findOne({
        include: [
            {
                include: [
                    {
                        model: Achievements
                    },
                    {
                        model: Action
                    }
                ],
                model: Scene,
                where: {
                    action: n
                }
            }
        ],
        where: {
            titleEN: advName
        }
    });
    const [act] = result!.scenes;
    // Const {staticBasePath} = res.locals;
    if (act) {
        const {image, description, positionDescription} = act;
        const data = {
            achievements: act.achievements,
            buttons: act.actions,
            description,
            image,
            positionDescription
        };
        res.json(data);
    } else {
        res.sendStatus(404);
    }
}
