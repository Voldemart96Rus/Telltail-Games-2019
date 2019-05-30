import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';

import {Achievements} from './Achievements';
import {Scene} from './Scene';

@Table
export class ScenesAchievements extends Model<ScenesAchievements> {
    @ForeignKey(() => Scene)
    @Column(DataType.INTEGER)
    actionsId: number;

    @ForeignKey(() => Achievements)
    @Column(DataType.INTEGER)
    achievementsId: number;
}
