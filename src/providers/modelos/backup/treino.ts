import { ManyToOne, Column, OneToMany, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Alunos } from "./alunos";
import { Treinadores } from "./treinador";
import { Exercicios } from "./exercicio";


@Entity('treinos')
export class Treinos {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Alunos, aluno => aluno.treinos)
    aluno: Alunos;

    @ManyToOne(type => Treinadores, treinador => treinador.treinos)
    treinador: Treinadores;

    @Column()
    foco: string;

    @OneToMany(type => Exercicios, exercicios => exercicios.treino)
    exercicios: Exercicios[];
}