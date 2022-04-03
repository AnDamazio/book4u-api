import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['cpf'])
@Unique(['email'])
@Unique(['rg'])
export class PersonalData {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ name: 'email' })
  email!: string;

  @Column()
  password!: string;

  @Column({ name: 'cpf' })
  cpf!: string;

  @Column({ name: 'rg' })
  rg!: string;

  @Column()
  cellphone!: string;
}
