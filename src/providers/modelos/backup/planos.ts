import { Column, PrimaryColumn, Entity } from "typeorm";

@Entity('planos')
export class Planos{
    @PrimaryColumn()
    nome: string;

    @Column()
    valor: string;

    @Column()
    data_pgto: string;
}