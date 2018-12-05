import { Column, PrimaryColumn, OneToOne, JoinColumn, OneToMany, Entity } from "typeorm";
import { Endereco } from "./endereco";
import { Alunos } from "./alunos";
import { Treinos } from "./treino";

@Entity('treinadores')
export class Treinadores {
    @PrimaryColumn()
    cpf: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column()
    senha: string;
    
    @OneToOne(type => Endereco)
    @JoinColumn()
    endereco: Endereco;

    @OneToMany(type => Alunos, aluno => aluno.treinador, {cascade: true})
    alunos: Alunos[];

    @OneToMany(type => Treinos, treinos => treinos.treinador, {cascade: true})
    treinos: Treinos[];

    @Column({nullable: true})
    foto: string;
}