import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

import {Scene} from './Scene';

@Table
export class Action extends Model<Action> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    nextAction: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @ForeignKey(() => Scene)
    @Column(DataType.INTEGER)
    sceneId: number;

    @BelongsTo(() => Scene)
    scene: Scene;
}
