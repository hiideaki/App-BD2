import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TreinoPage } from '../treino/treino';


@IonicPage()
@Component({
  selector: 'page-meus-treinos',
  templateUrl: 'meus-treinos.html',
})
export class MeusTreinosPage {

  treinos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // preenchendo provisoriamente
    this.treinos = [
      {
        foco: "Hipertrofia",
        treinador: "Raul Tragante"
      }, 
      {
        foco: "Emagrecimento",
        treinador: "Bruno Belluzzo"
      }
    ]
  }

  ionViewDidLoad() {
  }

  
  abrirTreino(item) {
    console.log(item)
    this.navCtrl.push(TreinoPage, item);
  }

}
