import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the TrocarSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trocar-senha',
  templateUrl: 'trocar-senha.html',
})
export class TrocarSenhaPage {

  @ViewChild("form") form: NgForm;

  senhaOld: string;
  senhaNew: string;
  confSenhaNew: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

  }

  confirmar() {
    let toast = this.toastCtrl.create({
      position: "bottom",
      duration: 1000
    })

    if(this.form.form.valid) {
      if(this.senhaNew != this.confSenhaNew) {
        toast.setMessage("As senhas estão diferentes");
      } else {
        
        // Verificar com a senha do banco de dados
        if(this.senhaOld === "Senha123") {
          toast.setMessage("Senha alterada com sucesso!");
          toast.present();
          this.navCtrl.pop();
        } else {
          toast.setMessage("A senha atual inserida está incorreta");
        }

      }

    } else {
      toast.setMessage("Preencha todos os campos");
    }
    toast.present();
  }

}
