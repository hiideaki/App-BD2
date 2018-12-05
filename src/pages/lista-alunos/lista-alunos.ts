import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DBServices } from '../../providers/database/database'

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

  lista = [];
  listaView: any;
  myInput: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private dbServices: DBServices) {
  }

  ionViewDidLoad() {
    this.dbServices.getAlunosAll().then(dados => {
      dados.forEach(data => {
        console.log(data);
        this.lista.push({cpf: data.cpf, nome: data.nome})
      })
      this.listaView = this.lista.sort((a, b) => (a.nome < b.nome ? -1 : 1))
    })
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
