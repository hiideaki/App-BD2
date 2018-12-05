import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { StreamingVideoOptions, StreamingMedia } from '@ionic-native/streaming-media';

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

  videoSrc: string;

  carga: any;
  reps: any;
  series: any;
  musculo: any;
  id: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public viewCtrl: ViewController, 
     private toastCtrl: ToastController, 
     private streamingMedia: StreamingMedia) {
    this.dados = navParams.data.item;
    this.carga = this.dados.carga;
    this.reps = this.dados.reps;
    this.series = this.dados.series;
    this.musculo = navParams.data.musculo;
    this.id = this.dados.id;

  }

  ionViewDidLoad() {
    
  }
  
  verVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      controls: true
    };
    
    this.streamingMedia.playVideo(this.videoSrc, options);
  }

  save() {
    let toast = this.toastCtrl.create({
      duration: 1000,
      position: "bottom"
    })
    if(this.form.form.valid) {
      let dados = {id: this.id, musculo: this.musculo, nome: this.dados.nome, carga: this.carga, series: this.series, reps: this.reps }
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
