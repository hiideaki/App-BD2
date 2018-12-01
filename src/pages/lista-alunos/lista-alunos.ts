import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ListaAlunosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-alunos',
  templateUrl: 'lista-alunos.html',
})
export class ListaAlunosPage {

  lista: any;
  listaView: any;
  myInput: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
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

  ionViewDidLoad() {
  }
  
  onInput() {
    // Filtra a lista de acordo com o input do usuário
    this.listaView = this.lista.filter((item) => {  
      return item.nome.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1;
    });
  }


  setAluno(item) {
    this.viewCtrl.dismiss({ dados: item });
  }

  dismiss() {
    this.viewCtrl.dismiss({ dados: null });
  }

}
