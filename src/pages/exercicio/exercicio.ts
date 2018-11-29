import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ExercicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exercicio',
  templateUrl: 'exercicio.html',
})
export class ExercicioPage {

  dados: any;

  carga: any;
  reps: any;
  series: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.dados = navParams.data;
    this.carga = this.dados.carga;
    this.reps = this.dados.reps;
    this.series = this.dados.series;

    console.log(viewCtrl)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExercicioPage');
  }

  dismiss(mudou) {

    if(mudou) {
      // Salva no BD as mudanças
    }

    let dados = { nome: this.dados.nome, carga: this.carga, series: this.series, reps: this.reps }
    this.viewCtrl.dismiss({ mudou, dados })
  }


}
