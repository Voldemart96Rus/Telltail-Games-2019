import {adventurePlayground} from 'controllers/adventure-playground';
import {chunk} from 'controllers/adventures';
import {filterTags, getAllTags} from 'controllers/hashtags';
import {getStaticBasePath} from 'controllers/staticBasePath';
import {authorize, register, user} from 'controllers/users';
import {Application} from 'express';
import {parse} from 'url';

export function routes(app: Application) {
    app.get('/', (_req, res) => res.renderPage('/adventures'));

    app.get('/filterAdventure?', filterTags);
    app.get('/tags/:name', (_req, res) => res.renderPage('/tags'));
    app.get('/:advName/:n', (_req, res) => res.renderPage('/adventurePlayground'));
    app.get('/authorization', (_req, res) => res.renderPage('/authorization'));
    app.get('/registration', (_req, res) => res.renderPage('/registration'));
    app.get('/getScene?', adventurePlayground);
    app.get('/adventures*', chunk);
    app.get('/staticBasePath?', getStaticBasePath);
    app.get('/hashtags', getAllTags);
    app.get('/user*', user);

    app.post('/authorization', authorize);
    app.post('/api/reg', register);

    app.all('*', (req, res) => {
    // Для обработки запроса используем стандартный для Next.js обработчик
        const handleRequest = req.nextApp.getRequestHandler();
        const parsedUrl = parse(req.url, true);

        return handleRequest(req, res, parsedUrl);
    });
}
