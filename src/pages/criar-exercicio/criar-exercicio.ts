import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL, ToastController } from 'ionic-angular';
import { ExercicioProvider } from '../../providers/exercicio/exercicio';
import { Camera } from '@ionic-native/camera';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { DBServices } from '../../providers/database/database';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the CriarExercicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-exercicio',
  templateUrl: 'criar-exercicio.html',
})
export class CriarExercicioPage {
  @ViewChild('form') form: NgForm;

  exercicio: ExercicioProvider = new ExercicioProvider()
  videoSrc: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private streamingMedia: StreamingMedia, private dbServices: DBServices, private toastCtrl: ToastController) {
    this.videoSrc = null;
  }

  ionViewDidLoad() {
    
  }

  selVideo() {
    
    let cameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.VIDEO
    }

    this.camera.getPicture(cameraOptions)
    .then(file_uri => this.videoSrc = normalizeURL(file_uri), 
    err => console.log(err));
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

      this.dbServices.criaExercicio_Info(this.exercicio.nome, this.exercicio.musculo, this.videoSrc);
      
      toast.setMessage("Exercício criado com sucesso");
      toast.present();

      this.navCtrl.pop();
    } else {
      toast.setMessage("Preencha todos os campos");
      toast.present();
    }
    
  }

  dismiss() {
    this.navCtrl.pop();
  }

}
