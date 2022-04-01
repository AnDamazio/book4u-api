import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class PersonalData {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    email: string

    @Column()
    password: string
    
    @Column()
    cpf: string;

    @Column()
    rg: string;

    @Column()
    cellphone: string;
}