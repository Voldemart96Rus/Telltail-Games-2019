import config from 'config';
import express, {NextFunction as Next, Request, Response} from 'express';
import hbs from 'hbs';
import morgan from 'morgan';
import path from 'path';

import initDataBase from 'initDataBase';
import commonData from 'middlewares/common-data';
import {routes} from 'routes';

const app = express();

const viewsDir = path.join(__dirname, '../views');

const partialsDir = path.join(viewsDir, '/partials');

const publicDir = path.join(__dirname, '../public');

initDataBase();

app.set('view engine', 'hbs');

app.set('views', viewsDir);

if (config.get('debug')) {
    app.use(morgan('dev'));
}

app.use(express.static(publicDir));

app.use((err: Error, _req: Request, _res: Response, next: Next) => {
    console.error(err.stack);

    next();
});

app.use(commonData);

routes(app);

app.use((err: Error, _req: Request, res: Response, _next: Next) => {
    console.error(err.stack);
    res.sendStatus(500);
});

hbs.registerPartials(partialsDir, () => {
    const port = config.get('port');

    app.listen(port, () => {
        console.info(`Server started on ${port}`);
        console.info(`Open http://localhost:${port}/`);
    });
});
