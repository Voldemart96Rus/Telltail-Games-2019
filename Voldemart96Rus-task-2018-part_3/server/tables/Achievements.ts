import {
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

import {Scene} from './Scene';
import {ScenesAchievements} from './ScenesAchievements';

@Table
export class Achievements extends Model<Achievements> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    medal: string;

    @Column(DataType.STRING)
    image: string;

    @BelongsToMany(() => Scene, () => ScenesAchievements)
    scenes: Scene[];
}
