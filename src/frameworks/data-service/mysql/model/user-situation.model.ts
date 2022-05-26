import { EnumUserSituation } from 'src/core';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from 'typeorm';
import { User } from './user.model';

@Entity()
export class UserSituation {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({
        type: "enum",
        enum: EnumUserSituation,
        default: EnumUserSituation.PENDENTE,
    })
    name: keyof typeof EnumUserSituation;

    @OneToMany(() => User, (user) => user.userSituation, { cascade: true })
    user: User[];
}