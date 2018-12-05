import { createConnection, getRepository, Repository, getConnection, Any } from 'typeorm';
import { Exercicio_Info } from '../modelos/exercicio_info';
import { Exercicios } from '../modelos/exercicio';
import { Alunos } from '../modelos/alunos';
import { Treinadores } from '../modelos/treinador';
import { Treinos } from '../modelos/treino';
import { Endereco } from '../modelos/endereco';
import { Planos } from '../modelos/planos';
import { UsuarioProvider } from '../usuario/usuario';

export class DBServices {

    async init(){
        const planos_repository = getRepository('planos') as Repository<Planos>;
        const alunos_repository = getRepository('alunos') as Repository<Alunos>;
        const treinadores_repository = getRepository('treinadores') as Repository<Treinadores>;
        const endereco_repository = getRepository('endereco') as Repository<Endereco>;
        const exercicios_repository = getRepository('exercicios') as Repository<Exercicios>;
        const exercicio_info_repository = getRepository('exercicio_info') as Repository<Exercicio_Info>;
        const treinos_repository = getRepository('treinos') as Repository<Treinos>;


        const plano = new Planos();
        plano.nome = "Prata";
        plano.valor = 70;
        plano.data_pgto = "Todo dia 20";

        await planos_repository.save(plano);

        const endereco = new Endereco();
        endereco.bairro = "Centro";
        endereco.cidade = "Bauru";
        endereco.rua = "Rua Rodrigues Alves";
        endereco.numero = "4-21";

        await endereco_repository.save(endereco);
        
        const aluno = new Alunos();
        aluno.cpf = 10;
        aluno.nome = "Bruno Belluzo";
        aluno.email = "bruno@email.com";
        aluno.telefone = "1234-5678";
        aluno.senha = "senha123";
        aluno.endereco = endereco;
        aluno.plano = plano;
        aluno.foto = "./assets/imgs/profile-default.png";

        await alunos_repository.save(aluno);

        const endereco2 = new Endereco();
        endereco2.bairro = "Centro";
        endereco2.cidade = "Bauru";
        endereco2.rua = "Duque";
        endereco2.numero = "7-108";

        await endereco_repository.save(endereco2);

        const treinador = new Treinadores();
        treinador.cpf = 1;
        treinador.nome = "Rafael Takagi";
        treinador.email = "rafael@email.com";
        treinador.endereco = endereco2;
        treinador.senha = "senha123";
        //treinador.alunos = [aluno];
        treinador.telefone = "9658-7458";
        treinador.foto = "./assets/imgs/profile-default.png";

        await treinadores_repository.save(treinador);

        const plano2 = new Planos();
        plano2.nome = "Black";
        plano2.valor = 180;
        plano2.data_pgto = "Todo dia 10";

        await planos_repository.save(plano2);

        const endereco3 = new Endereco();
        endereco3.bairro = "Jardim Marambá";
        endereco3.cidade = "Bauru";
        endereco3.rua = "Rua Doutor Gonzaga Machado";
        endereco3.numero = "7-108";
        endereco3.complemento = "Cond. Camélias, Bloco 9, Apto. 21";

        await endereco_repository.save(endereco3);
        
        const aluno2 = new Alunos();
        aluno2.cpf = 11;
        aluno2.nome = "Marcelo Hideaki Iwata Kito";
        aluno2.email = "hideaki@email.com";
        aluno2.telefone = "(11) 94128-3644";
        aluno2.senha = "senha123";
        aluno2.endereco = endereco3;
        aluno2.plano = plano2;
        aluno2.foto = "./assets/imgs/profile-default.png";

        await alunos_repository.save(aluno2);
    }

    async getUser(email: string, senha: string){
        const alunos_repository = getRepository('alunos') as Repository<Alunos>;
        const treinadores_repository = getRepository('treinadores') as Repository<Treinadores>;
        const user = new UsuarioProvider();
        
        //alunos_repository.find({where: {email: email, senha: senha}});
        const aluno = await alunos_repository.createQueryBuilder('alunos')
                            .leftJoinAndSelect('alunos.endereco', 'endereco')
                            .leftJoinAndSelect('alunos.plano', 'plano')
                            .where('alunos.email = :email AND alunos.senha = :senha', {email: email, senha: senha}).getOne();
        
        if (aluno){
            return aluno;
        }
        else {
            const treinador = await treinadores_repository.createQueryBuilder('treinadores')
                                    .leftJoinAndSelect('treinadores.endereco', 'endereco')
                                    .leftJoinAndSelect('treinadores.alunos', 'alunos')
                                    .where('treinadores.email = :email AND treinadores.senha = :senha', {email: email, senha: senha}).getOne();
            // treinadores_repository.find({where: {email: email, senha: senha}});
            if (treinador) {
                return treinador;
            }
        }
        return null;

    }

    async CriaTreino(aluno: string, treinador: string, exercicio: string, carga: string, repeticoes: string, series: string, id?: number, foco?: string, exercicioid?: number){
        const alunos_repository = getRepository('alunos') as Repository<Alunos>;
        const treinadores_repository = getRepository('treinadores') as Repository<Treinadores>;
        const exercicios_repository = getRepository('exercicios') as Repository<Exercicios>;
        const exercicio_info_repository = getRepository('exercicio_info') as Repository<Exercicio_Info>;
        const treinos_repository = getRepository('treinos') as Repository<Treinos>;
       
        const trainer = await treinadores_repository.createQueryBuilder('treinadores').where('treinadores.nome = :nome', {nome: treinador}).getOne();
        const exercicioAux = await exercicio_info_repository.createQueryBuilder('exercicio_info').where('exercicio_info.nome = :exercicio', {exercicio: exercicio}).getOne();
        const treinado = await alunos_repository.createQueryBuilder('alunos').where('alunos.nome = :nome', {nome: aluno}).getOne();

        if (trainer.alunos){
            trainer.alunos.push(treinado);
        }
        else {
            trainer.alunos = [treinado];
        }
        await treinadores_repository.save(trainer);

        treinado.treinador = trainer;
        await alunos_repository.save(treinado)



        let exercicios = await exercicios_repository.createQueryBuilder('exercicios').where('exercicios.id = :id', {id: exercicioid}).getOne();
        if (exercicios){
            if (exercicios.carga != carga || exercicios.repeticoes != repeticoes || exercicios.series != series){
                exercicios.carga = carga;
                exercicios.repeticoes = repeticoes;
                exercicios.series = series;
                await exercicios_repository.save(exercicios);    
            }
            return;
        }
        exercicios = new Exercicios();
        exercicios.carga = carga;
        exercicios.repeticoes = repeticoes;
        exercicios.series = series;
        exercicios.exercicio = exercicioAux;
        await exercicios_repository.save(exercicios);

        if (id) {
            const treino = await treinos_repository.createQueryBuilder('treinos')
                                    .innerJoinAndSelect('treinos.aluno', 'alunos', 'alunos.nome = :aluno', {aluno: aluno})
                                    .innerJoinAndSelect('treinos.treinador', 'treinadores', 'treinadores.nome = :treinador', {treinador: treinador})
                                    .innerJoinAndSelect('treinos.exercicios', 'exercicios')
                                    .where('treinos.id = :id', {id: id})
                                    .getOne();
        
            treino.exercicios.push(exercicios);
            await treinos_repository.save(treino);
            return treino.id;
        }
        else {
            const treino = new Treinos();
            treino.aluno = treinado;
            treino.treinador = trainer;
            treino.exercicios = [exercicios];
            treino.foco = foco;
            await treinos_repository.save(treino);
            return treino.id;
        }

        
    }
    
    async getAlunosAll() {
        const alunos_repository = getRepository('alunos') as Repository<Alunos>;
        const alunos = await alunos_repository.createQueryBuilder('alunos')
                                .getMany();
        return alunos;
    }

    async getTreinos(aluno: string){
        const treinos_repository = getRepository('treinos') as Repository<Treinos>;
        const treinos = await treinos_repository.createQueryBuilder('treinos')
                                .leftJoinAndSelect('treinos.treinador', 'treinador')
                                .innerJoinAndSelect('treinos.aluno', 'aluno', 'aluno.nome = :nome', {nome: aluno})
                                .leftJoinAndSelect('treinos.exercicios', 'exercicios')
                                .getMany();
        
        return treinos;
    }

    async criaExercicio_Info(nome: string, musculo: string, video: string){
        const exercicio_info_repository = getRepository('exercicio_info') as Repository<Exercicio_Info>;
        const exercicio = new Exercicio_Info();

        exercicio.nome = nome;
        exercicio.musculo = musculo;
        exercicio.video = video;

        await exercicio_info_repository.save(exercicio);
    }

    async getInfoTreino(id: number, aluno: string){
        const treinos_repository = getRepository('treinos') as Repository<Treinos>;
        const treino = await treinos_repository.createQueryBuilder('treinos')
                                .leftJoinAndSelect('treinos.aluno', 'aluno', 'aluno.nome = :nome', {nome: aluno})
                                .leftJoinAndSelect('treinos.exercicios', 'exercicios')
                                .leftJoinAndSelect('exercicios.exercicio', 'info_exe')
                                .where('treinos.id = :id', {id: id})
                                .getOne();
        return treino;
    }

    async getListaExercicios_Info(){
        const exercicio_info_repository = getRepository('exercicio_info') as Repository<Exercicio_Info>;
        const exs_info = await exercicio_info_repository.createQueryBuilder('exercicios_info')
                                                        .getMany();
        return exs_info;
    }

    async getExercicioInfo(id: number){
        const exercicio_info_repository = getRepository('exercicio_info') as Repository<Exercicio_Info>;
        const exe_info = await exercicio_info_repository.createQueryBuilder('exercicio_info')
                                                    .where('exercicio_info.id = :id', {id: id})
                                                    .getOne();

        return exe_info;
    }

    async destroiExercicio(id: number){
        const exercicios_repository = getRepository('exercicios') as Repository<Exercicios>;
        exercicios_repository.createQueryBuilder('exercicios')
                                .delete()
                                .where('exercicios.id = :id', {id: id})
                                .execute();
    }

    async trocaSenha(cpf: number, ocupacao: string, senha: string) {
        if(ocupacao == 'Aluno'){
            const alunos_repository = getRepository('alunos') as Repository<Alunos>;
            const aluno = await alunos_repository.createQueryBuilder('alunos')
                                            .where('alunos.cpf = :cpfaluno', {cpfaluno: cpf})
                                            .getOne();
            aluno.senha = senha;
            
            await alunos_repository.save(aluno);
            return;
        }
        else{
            const treinadores_repository = getRepository('treinadores') as Repository<Treinadores>;
            const treinador = await treinadores_repository.createQueryBuilder('treinadores')
                                                    .where('treinadores.cpf = :cpftreinador', {cpftreinador: cpf})
                                                    .getOne();
            treinador.senha = senha;
            await treinadores_repository.save(treinador);
            return;
        }
    }

    async setFoto(cpf: number, foto: string, ocupacao: string) {
        if(ocupacao == 'Aluno'){
            const alunos_repository = getRepository('alunos') as Repository<Alunos>;
            const aluno = await alunos_repository.createQueryBuilder('alunos')
                                            .where('alunos.cpf = :cpfaluno', {cpfaluno: cpf})
                                            .getOne();
            aluno.foto = foto;
            
            await alunos_repository.save(aluno);
            return;
        } else {
            const treinadores_repository = getRepository('treinadores') as Repository<Treinadores>;
            const treinador = await treinadores_repository.createQueryBuilder('treinadores')
                                                    .where('treinadores.cpf = :cpftreinador', {cpftreinador: cpf})
                                                    .getOne();
            treinador.foto = foto;
            await treinadores_repository.save(treinador);
            return;
        }
    }

}