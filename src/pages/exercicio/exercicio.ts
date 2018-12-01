import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

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

  @ViewChild("form") form: NgForm;

  dados: any;

  carga: any;
  reps: any;
  series: any;
  musculo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController) {
    this.dados = navParams.data.item;
    this.carga = this.dados.carga;
    this.reps = this.dados.reps;
    this.series = this.dados.series;
    this.musculo = navParams.data.musculo;

  }

  ionViewDidLoad() {
  }

  save() {
    let toast = this.toastCtrl.create({
      duration: 1000,
      position: "bottom"
    })
    if(this.form.form.valid) {
      let dados = { musculo: this.musculo, nome: this.dados.nome, carga: this.carga, series: this.series, reps: this.reps }
      this.viewCtrl.dismiss({ mudou: true, dados });
      toast.setDuration(1000),
      toast.setMessage("Exercício salvo");
    } else {
      toast.setMessage("Preencha todos os campos");
    }
    toast.present();
  }

  dismiss() {
    
    this.viewCtrl.dismiss({ mudou: false, dados: null })
  }


}
