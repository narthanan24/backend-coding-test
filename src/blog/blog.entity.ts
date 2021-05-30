import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BlogEntity{
  @PrimaryGeneratedColumn()
  id:string;

  @Column()
  title:string;

  @Column()
  content:string;
}
