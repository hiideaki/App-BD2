import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { Exercicios } from "./exercicio";

@Entity('exercicio_info')
export class Exercicio_Info{
    
    @PrimaryColumn()
    nome: string;

    @Column()
    musculo: string;

    @Column({nullable: true})
    video: string;

    @OneToMany(type => Exercicios, exercicio => exercicio.exercicio)
    exercicios: Exercicios[];
}