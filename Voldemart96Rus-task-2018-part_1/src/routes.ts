import {adventurePlayground} from 'controllers/adventure-playground';
import {list} from 'controllers/adventures';
import {error404} from 'controllers/errors';
import {filterTags} from 'controllers/hashtags';
import {Application} from 'express';

export function routes(app: Application) {
    app.get('/', list);

    app.get('/tags/:hash', filterTags);

    app.get('/:advName/:n', adventurePlayground);

    app.all('*', error404);
}
