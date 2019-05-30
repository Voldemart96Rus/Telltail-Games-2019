import config from 'config';
import {NextFunction as Next, Request, Response} from 'express';
import {Server} from 'next';

export default (nextApp: Server) => (req: Request, res: Response, next: Next) => {
    req.nextApp = nextApp;
    res.locals.title = 'Game';
    res.locals.staticBasePath = config.get('staticBasePath');
    res.renderPage = (pathname, query) => {
        nextApp.render(req, res, pathname, query);
    };

    next();
};
