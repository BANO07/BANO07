import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enum/role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    @Column({unique: true})
    username:string;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column({type:'jsonb'})
    roles:Role[];

}
