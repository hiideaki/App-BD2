import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TreinoPage } from '../treino/treino';
import { UsuarioProvider } from '../../providers/usuario/usuario';


@IonicPage()
@Component({
  selector: 'page-meus-treinos',
  templateUrl: 'meus-treinos.html',
})
export class MeusTreinosPage {

  treinos: any;
  aluno: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private user: UsuarioProvider) {
    
    this.aluno = navParams.data;
    
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
    this.navCtrl.push(TreinoPage, item);
  }

}
