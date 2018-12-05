import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Form } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { NgForm } from '@angular/forms';
import { DBServices } from '../../providers/database/database';
import { Alunos } from '../../providers/modelos/alunos';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, private user: UsuarioProvider, private dbServices: DBServices) {
      
      
  }

  ionViewDidLoad() {
  }

  
  getUser() {
    this.user.nome = "Marcelo Hideaki Iwata Kito";
    // this.user.ocupacao = "Aluno";
    // this.user.ocupacao = "Treinador";
    this.user.email = "hideaki09@hotmail.com";
    this.user.fone = "(11) 94128-3644";

    this.user.cidade = "Bauru";
    this.user.bairro = "Jardim Marambá";
    this.user.rua = "Rua Doutor Gonzaga Machado";
    this.user.numero = "7-108";
    this.user.complemento = "Cond. Camélias, Bloco 9, Apto. 21";

    if(this.user.ocupacao === "Aluno") {
      this.user.plano = "Mensal";
      //this.user.valor = "R$ 75,00";
      this.user.vencimento = "05/12/2018";
    }
  }

  login() {
    // Tirar o true depois
    // if(this.form.form.valid || true) {

      // if(this.email === "Aluno") {
      //   this.user.ocupacao = "Aluno";
      // } else {
      //   this.user.ocupacao = "Treinador";
      // }
      this.dbServices.init();
      //this.getUser();

      const usuario = this.dbServices.getUser(this.email, this.senha);
      console.log(usuario);
      usuario.then(dados => {
        if (!dados) {
          console.log("Usuário não encontrado!!!!!!!!!!!");          
        }
        else {
          this.user.nome = dados.nome;
          this.user.email = dados.email;
          this.user.fone = dados.telefone;
          this.user.bairro = dados.endereco.bairro;
          this.user.rua = dados.endereco.rua;
          this.user.numero = dados.endereco.numero;
          this.user.cidade = dados.endereco.cidade;
          this.user.complemento = dados.endereco.complemento;
          if (dados instanceof Alunos){
            this.user.ocupacao = "Aluno";
            this.user.plano = dados.plano.nome;
            this.user.valor = dados.plano.valor;
            this.user.vencimento = dados.plano.data_pgto;
          }
          else {
            this.user.ocupacao = "Treinador";
          }
          this.navCtrl.setRoot(TabsPage);
        }
      })

    // } else {
    //   console.log('preencha tudo');
    // }
  }

}
