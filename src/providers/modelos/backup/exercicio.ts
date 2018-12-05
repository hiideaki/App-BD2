import { ManyToOne, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exercicio_Info } from "./exercicio_info";
import { Treinos } from "./treino";


@Entity('exercicios')
export class Exercicios {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Treinos, treino => treino.exercicios)
    treino: Treinos;

    @ManyToOne(type => Exercicio_Info, exercicio_info => exercicio_info.exercicios)
    exercicio: Exercicio_Info;

    @Column()
    carga: string;

    @Column()
    repeticoes: string;

    @Column()
    series: string;
}