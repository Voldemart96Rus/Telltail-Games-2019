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

import slug from 'slug';
import {Adventure} from './Adventure';
import {TagsAdventure} from './TagAdventure';

@Scopes({
    adventures: {
        include: [
            {
                model: () => Adventure,
                through: {attributes: []}
            }
        ]
    }
})
@Table
export class Tags extends Model<Tags> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    hash: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    hashEN = slug(this.hash);

    @BelongsToMany(() => Adventure, () => TagsAdventure)
    adventures: Adventure[];
}
