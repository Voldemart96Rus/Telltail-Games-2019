import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';

import {Adventure} from './Adventure';
import {Scene} from './Scene';

@Table
export class AdventureScenes extends Model<AdventureScenes> {
    @ForeignKey(() => Scene)
    @Column(DataType.INTEGER)
    actionsId: number;

    @ForeignKey(() => Adventure)
    @Column(DataType.INTEGER)
    adventureId: number;
}
