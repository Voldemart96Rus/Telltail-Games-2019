import {adventurePlayground} from 'controllers/adventure-playground';
import {chunk, list} from 'controllers/adventures';
import {error404} from 'controllers/errors';
import {filterTags, getAllTags} from 'controllers/hashtags';
import {Application} from 'express';

export function routes(app: Application) {
    app.get('/', list);

    app.get('/tags/:hash', filterTags);

    app.get('/:advName/:n', adventurePlayground);
    app.get('/adventures*', chunk);
    app.get('/hashtags*', getAllTags);

    app.all('*', error404);
}
