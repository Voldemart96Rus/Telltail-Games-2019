import {
    AllowNull,
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Scopes,
    Table
} from 'sequelize-typescript';

import {AdventureScenes} from './AdventureScenes';
import {Scene} from './Scene';
import {TagsAdventure} from './TagAdventure';
import {Tags} from './Tags';

@Scopes({
    action: {
        include: [
            {
                model: () => Scene,
                through: {attributes: []}
            }
        ]
    },
    tags: {
        include: [
            {
                model: () => Tags,
                through: {attributes: []}
            }
        ]
    }
})
@Table
export class Adventure extends Model<Adventure> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    titleEN: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    title: string;

    @Column(DataType.STRING)
    description: string;

    @Column(DataType.STRING)
    img: string;

    @BelongsToMany(() => Tags, () => TagsAdventure)
    tags: Tags[];

    @BelongsToMany(() => Scene, () => AdventureScenes)
    scenes: Scene[];
}
