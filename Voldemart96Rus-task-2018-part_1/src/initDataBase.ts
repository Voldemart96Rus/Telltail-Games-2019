import {Sequelize, SequelizeOptions} from 'sequelize-typescript';

import {Achievements} from 'tables/Achievements';
import {Action} from 'tables/Action';
import {Adventure} from 'tables/Adventure';
import {AdventureScenes} from 'tables/AdventureScenes';
import {Scene} from 'tables/Scene';
import {ScenesAchievements} from 'tables/ScenesAchievements';
import {TagsAdventure} from 'tables/TagAdventure';
import {Tags} from 'tables/Tags';

export default async function initDataBase() {
    const sequelizeOptions: SequelizeOptions = {
        database: process.env.DB_LOGIN,
        host: 'isilo.db.elephantsql.com',
        password: process.env.DB_PASS,
        port: 5432,
        username: process.env.DB_LOGIN,

        dialect: 'postgres'
    };

    const sequelize = new Sequelize(sequelizeOptions);
    sequelize.addModels([
        Adventure,
        AdventureScenes,
        Scene,
        Action,
        Tags,
        TagsAdventure,
        Achievements,
        ScenesAchievements
    ]);
}
