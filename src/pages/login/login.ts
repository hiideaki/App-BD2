import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Form, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { NgForm } from '@angular/forms';
import { DBServices } from '../../providers/database/database';
import { Alunos } from '../../providers/modelos/alunos';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild("form") form: NgForm;
  email: string;
  senha: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private user: UsuarioProvider, private dbServices: DBServices,
    private toastCtrl: ToastController, private storage: Storage) {
      
      
  }

  ionViewDidLoad() {
  }

  
  login() {
    let toast = this.toastCtrl.create({
      duration: 1500,
      position: 'bottom'
    })
    
    if(this.form.form.valid) {
      this.storage.get('first_time').then((val) => {
        if (val == null) {
          this.storage.set('first_time', 'done');
          this.dbServices.init();
        }
     });

      const usuario = this.dbServices.getUser(this.email, this.senha);
      console.log(usuario);
      usuario.then(dados => {
        if (!dados) {
          toast.setMessage("Usuário ou senha incorretos");     
          toast.present();
        }
        else {
          this.user.cpf = dados.cpf;
          this.user.nome = dados.nome;
          this.user.email = dados.email;
          this.user.senha = dados.senha;
          this.user.fone = dados.telefone;
          this.user.bairro = dados.endereco.bairro;
          this.user.rua = dados.endereco.rua;
          this.user.numero = dados.endereco.numero;
          this.user.cidade = dados.endereco.cidade;
          this.user.complemento = dados.endereco.complemento;
          this.user.foto = dados.foto;
          if (dados instanceof Alunos){
            this.user.ocupacao = "Aluno";
            this.user.plano = dados.plano.nome;
            this.user.valor = dados.plano.valor;
            this.user.vencimento = dados.plano.data_pgto;
          }
          else {
            this.user.ocupacao = "Treinador";
          }
          console.log(this.user)
          this.navCtrl.setRoot(TabsPage);
        }
      })

    } else {
      toast.setMessage("Preencha todos os campos!");
      toast.present();
    }
  }

}
