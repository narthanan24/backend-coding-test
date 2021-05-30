import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({length:50})
  name:string;

  @Column()
  dateOfBirth:Date

  @Column()
  email:string;

  @Column()
  password:string;

  @Column()
  role:string;
}
