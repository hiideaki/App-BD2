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
  musculo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.dados = navParams.data.item;
    this.carga = this.dados.carga;
    this.reps = this.dados.reps;
    this.series = this.dados.series;
    this.musculo = navParams.data.musculo;

  }

  ionViewDidLoad() {
  }

  dismiss(mudou) {
    
    let dados = { musculo: this.musculo, nome: this.dados.nome, carga: this.carga, series: this.series, reps: this.reps }
    this.viewCtrl.dismiss({ mudou, dados })
  }


}
