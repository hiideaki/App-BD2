import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, ToastController } from 'ionic-angular';
import { ExercicioPage } from '../exercicio/exercicio';
import { ExercicioProvider } from '../../providers/exercicio/exercicio';
import { ListaExerciciosPage } from '../lista-exercicios/lista-exercicios';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { DBServices } from '../../providers/database/database';

/**
 * Generated class for the TreinoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-treino',
  templateUrl: 'treino.html',
})
export class TreinoPage {

  dados: any;

  exercicios: ExercicioProvider = new ExercicioProvider();
  lista = [];
  listaView: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private modalCtrl: ModalController,
     private asController: ActionSheetController,
     private toastCtrl: ToastController,
     public user: UsuarioProvider,
     private dbServices: DBServices) {

    this.dados = navParams.data;
  }

  ionViewDidLoad() {    
    this.dbServices.getInfoTreino(this.dados.id, this.dados.aluno.nome).then(data => {
      data.exercicios.forEach(item => {
        this.lista.push({id: item.id, musculo: item.exercicio.musculo, nome: item.exercicio.nome, carga: item.carga, series: item.series, reps: item.repeticoes, video: item.exercicio.video})


      })
      
      this.listaView = this.exercicios.organizaSaida(this.lista);
      console.log(this.listaView)
    })
  }


  more(item) {
    
    
    let toast = this.toastCtrl.create({
      duration: 1000,
      position: 'bottom',
      message: "Exercício removido"
    })
    let c = this.asController.create({
      buttons: [
        {
          text: 'Remover',
          role: 'destructive',
          handler: () => {
            this.dbServices.destroiExercicio(this.lista[this.lista.findIndex((i) => i.nome === item.nome)].id);
            this.lista.splice(this.lista.findIndex((i) => i.nome === item.nome), 1);
            this.listaView = this.exercicios.organizaSaida(this.lista)
            
            toast.present();
          }
        }
      ]
    })
    c.present();
  }

  abrirExercicio(item, musculo) {
    let modal = this.modalCtrl.create(ExercicioPage, {item, musculo});
    modal.onDidDismiss((data) => {

      // Verifica se a ação realizada no modal foi de salvar o exercício
      if(data.mudou) {
        
        // Busca no vetor o exercício correspondente
        let aux = this.lista.find((j) => j.id === data.dados.id);

        aux.carga = data.dados.carga;
        aux.reps = data.dados.reps;
        aux.series = data.dados.series;
        this.listaView = this.exercicios.organizaSaida(this.lista);
      }
    })
    modal.present();
  }
  
  addExercicio() {
    let modal = this.modalCtrl.create(ListaExerciciosPage, {lista: this.lista});
    modal.onDidDismiss((data) => {
      if(data.mudou) {       
        this.lista.push(data.dados);
        this.listaView = this.exercicios.organizaSaida(this.lista);
      }
    })
    modal.present();
    
  }

  salvar() {
    let toast = this.toastCtrl.create({
      duration: 1000,
      position: 'bottom'
    })
    if(this.lista.length > 0) {
      
      this.lista.forEach(dados => {
        console.log(dados);
        this.dbServices.CriaTreino(this.dados.aluno.nome, this.dados.treinador.nome, dados.nome, dados.carga, dados.reps, dados.series, this.dados.id, null, dados.id);
      })
      toast.setMessage("Treino salvo!");
      toast.present();
      this.navCtrl.pop();
    } else {
      toast.setMessage("Adicione pelo menos um exercício");
      toast.present();
    }
  }

}
