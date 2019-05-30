import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';

import {Adventure} from './Adventure';
import {Tags} from './Tags';

@Table
export class TagsAdventure extends Model<TagsAdventure> {
    @ForeignKey(() => Tags)
    @Column(DataType.INTEGER)
    hashtagId: number;

    @ForeignKey(() => Adventure)
    @Column(DataType.INTEGER)
    adventureId: number;
}
