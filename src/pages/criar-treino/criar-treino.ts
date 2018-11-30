import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ListaExerciciosPage } from '../lista-exercicios/lista-exercicios';
import { ExercicioProvider } from '../../providers/exercicio/exercicio';

/**
 * Generated class for the CriarTreinoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-treino',
  templateUrl: 'criar-treino.html',
})
export class CriarTreinoPage {

  foco: any;
  aluno: any;

  private exercicio: ExercicioProvider = new ExercicioProvider();
  private lista: any;
  private listaView: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    this.lista = [];
  }

  ionViewDidLoad() {
  }

  setAluno() {
    // let modal = this.modalCtrl.create()
  }

  addExercicio() {
    let modal = this.modalCtrl.create(ListaExerciciosPage, {lista: this.lista});
    modal.onDidDismiss((data) => {
      if(data.mudou) {       
        this.lista.push(data.dados);
        this.listaView = this.exercicio.organizaSaida(this.lista);
      }
    })
    modal.present();
    
  }

}
