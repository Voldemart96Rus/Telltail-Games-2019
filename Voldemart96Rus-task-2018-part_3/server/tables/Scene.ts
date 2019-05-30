import {
    AllowNull,
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Scopes,
    Table
} from 'sequelize-typescript';

import {Achievements} from './Achievements';
import {Action} from './Action';
import {Adventure} from './Adventure';
import {AdventureScenes} from './AdventureScenes';
import {ScenesAchievements} from './ScenesAchievements';

@Scopes({
    achievements: {
        include: [
            {
                model: () => Achievements,
                through: {attributes: []}
            }
        ]
    }
})
@Table
export class Scene extends Model<Scene> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    action: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    image: string;

    @Column(DataType.STRING)
    description: string;

    @Column(DataType.STRING)
    positionDescription: string;

    @BelongsToMany(() => Adventure, () => AdventureScenes)
    adventure: Adventure;

    @BelongsToMany(() => Achievements, () => ScenesAchievements)
    achievements: Achievements[];

    @HasMany(() => Action)
    actions: Action[];
}
