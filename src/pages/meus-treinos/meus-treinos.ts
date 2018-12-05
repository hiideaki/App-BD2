import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TreinoPage } from '../treino/treino';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { DBServices } from '../../providers/database/database';


@IonicPage()
@Component({
  selector: 'page-meus-treinos',
  templateUrl: 'meus-treinos.html',
})
export class MeusTreinosPage {

  treinos = [];
  aluno: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private user: UsuarioProvider, private dbServices: DBServices) {
    
    this.aluno = navParams.data;
  
    /*
    this.treinos = [
      {
        foco: "Hipertrofia",
        treinador: "Raul Tragante"
      }, 
      {
        foco: "Emagrecimento",
        treinador: "Bruno Belluzzo"
      }
    ]*/
  }

  ionViewDidLoad() {
    if (this.aluno.nome){
      this.dbServices.getTreinos(this.aluno.nome).then(dados => {
        
        dados.forEach(data => {
          this.treinos.push(data);
        })
      });
    }
    else {
      this.dbServices.getTreinos(this.user.nome).then(dados => {
        
        dados.forEach(data => {
          this.treinos.push(data);
        })
      }); 
    }
  }

  
  abrirTreino(item) {
    this.navCtrl.push(TreinoPage, item);
  }

}
