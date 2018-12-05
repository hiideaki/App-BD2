import { Column, PrimaryColumn, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Alunos } from "./alunos";

@Entity('planos')
export class Planos{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    valor: number;

    @Column()
    data_pgto: string;

    @OneToMany(type => Alunos, aluno => aluno.plano)
    alunos: Alunos[];
}