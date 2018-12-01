import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CriarTreinoPage } from '../criar-treino/criar-treino';
import { ThrowStmt } from '@angular/compiler';
import { MeusTreinosPage } from '../meus-treinos/meus-treinos';

/**
 * Generated class for the MeusAlunosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meus-alunos',
  templateUrl: 'meus-alunos.html',
})
export class MeusAlunosPage {

  myInput: string;
  lista: any;
  listaView: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lista = [
      {
        nome: "Marcelo Hideaki Iwata Kito"
      },
      {
        nome: "Bruno Belluzzo"
      },
      {
        nome: "Vitor de Souza Cruzeiro"
      },
      {
        nome: "Paulo Eduardo Manzone Maia"
      },
      {
        nome: "Gabriel Góis"
      }
    ]

    this.listaView = this.lista.sort((a, b) => (a.nome < b.nome ? -1 : 1))
  }
  
  onInput() {
    // Filtra a lista de acordo com o input do usuário
    this.listaView = this.lista.filter((item) => {  
      return item.nome.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1;
    });
  }

  ionViewDidLoad() {
    
  }

  getAluno(item) {
    this.navCtrl.push(MeusTreinosPage, item);
  }

  addTreino() {
    this.navCtrl.push(CriarTreinoPage);
  }

}
