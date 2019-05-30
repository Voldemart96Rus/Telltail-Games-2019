import config from 'config';
import {NextFunction as Next, Request, Response} from 'express';

export default (_req: Request, res: Response, next: Next) => {
    res.locals.title = 'Game';
    res.locals.staticBasePath = config.get('staticBasePath');

    next();
};
