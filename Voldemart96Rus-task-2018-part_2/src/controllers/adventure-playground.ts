import {Request, Response} from 'express';

import {Achievements} from 'tables/Achievements';
import {Action} from 'tables/Action';
import {Adventure} from 'tables/Adventure';
import {Scene} from 'tables/Scene';

export async function adventurePlayground(req: Request, res: Response) {
    const {advName, n} = req.params;
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
    const {staticBasePath} = res.locals;
    if (act) {
        const {image, description, positionDescription} = act;
        const data = {
            achievements: act.achievements,
            buttons: act.actions,
            description,
            image,
            isPlaying: true,
            positionDescription,
            staticBasePath
        };
        res.render('index', data);
    } else {
        res.sendStatus(404);
    }
}
