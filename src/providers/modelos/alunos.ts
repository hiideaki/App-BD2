import { Column, PrimaryColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, Entity } from "typeorm";
import { Endereco } from "./endereco";
import { Planos } from "./planos";
import { Treinadores } from "./treinador";
import { Treinos } from "./treino";

@Entity('alunos')
export class Alunos {
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

    @ManyToOne(type => Planos, plano => plano.alunos)
    plano: Planos;

    @ManyToOne(type => Treinadores, treinador => treinador.alunos)
    treinador: Treinadores;

    @OneToMany(type => Treinos, treinos => treinos.aluno)
    treinos: Treinos[];
}