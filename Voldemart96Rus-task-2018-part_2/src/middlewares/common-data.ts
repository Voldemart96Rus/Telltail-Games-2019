import config from 'config';
import {NextFunction as Next, Request, Response} from 'express';

export default (_req: Request, res: Response, next: Next) => {
    const meta = {
        charset: 'utf-8',
        description: 'Game'
    };

    res.locals.meta = meta;
    res.locals.title = 'Game';
    res.locals.staticBasePath = config.get('staticBasePath');

    next();
};
