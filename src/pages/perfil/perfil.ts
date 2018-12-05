import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, normalizeURL } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { LoginPage } from '../login/login';
import { TrocarSenhaPage } from '../trocar-senha/trocar-senha';

import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DBServices } from '../../providers/database/database';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  imgSrc: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private user: UsuarioProvider, private app: App, private photoViewer: PhotoViewer, private camera: Camera, private dbServices: DBServices) {
    this.imgSrc = "./assets/imgs/profile-default.png"
    if (this.user.foto){
      this.imgSrc = this.user.foto;
    }
  }


  verFoto() {
    this.photoViewer.show(this.imgSrc);
  }

  selFoto() {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,      
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,      
      correctOrientation: true 
    }

    this.camera.getPicture(cameraOptions)
      .then(file_uri => {
        this.imgSrc = normalizeURL(file_uri)
        this.dbServices.setFoto(this.user.cpf, this.imgSrc, this.user.ocupacao);
     }  
    );
  }

  more() {
    this.navCtrl.push(TrocarSenhaPage);
  }

  logout() {

    Object.keys(this.user).forEach((prop) => {
      this.user[prop] = "";
    })
    
    this.app.getRootNav().setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log(this.user);
    
  }

}
