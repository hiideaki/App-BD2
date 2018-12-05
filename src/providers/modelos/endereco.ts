import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('endereco')
export class Endereco {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bairro: string;

    @Column()
    numero: string;

    @Column()
    rua: string;

    @Column()
    cidade: string;
    
    @Column({ nullable: true })
    complemento: string;
}
