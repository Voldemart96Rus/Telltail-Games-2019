import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    avatar: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    login: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string;

    @Column(DataType.STRING)
    salt: string;
}
