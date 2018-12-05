import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, ToastController } from 'ionic-angular';
import { ListaExerciciosPage } from '../lista-exercicios/lista-exercicios';
import { ExercicioProvider } from '../../providers/exercicio/exercicio';
import { ListaAlunosPage } from '../lista-alunos/lista-alunos';
import { ExercicioPage } from '../exercicio/exercicio';
import { NgForm } from '@angular/forms';
import { DBServices } from '../../providers/database/database';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the CriarTreinoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-treino',
  templateUrl: 'criar-treino.html',
})
export class CriarTreinoPage {

  @ViewChild("form") form: NgForm;

  foco: any;
  aluno: any;

  private exercicios: ExercicioProvider = new ExercicioProvider();
  private lista = [];
  private listaView: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     private modalCtrl: ModalController, 
     private asController: ActionSheetController,
     private toastCtrl: ToastController,
     public user: UsuarioProvider,
     private dbServices: DBServices) {
    this.lista = [];
  }

  ionViewDidLoad() {
  }

  setAluno() {
    let modal = this.modalCtrl.create(ListaAlunosPage);
    modal.onDidDismiss((data) => {
      if(data.dados) {
        this.aluno = data.dados.nome;
        console.log(data.dados)
      }
    })
    modal.present();
  }

  more(item, musculo) {
    let toast = this.toastCtrl.create({
      duration: 1000,
      position: 'bottom',
      message: "Exercício removido"
    })
    let c = this.asController.create({
      buttons: [
        {
          text: 'Remover',
          role: 'destructive',
          handler: () => {
            this.lista.splice(this.lista.findIndex((i) => i.nome === item.nome), 1);
            this.listaView = this.exercicios.organizaSaida(this.lista);
            toast.present();
          }
        }
      ]
    })
    c.present();
  }
    

  addExercicio() {
    let modal = this.modalCtrl.create(ListaExerciciosPage, {lista: this.lista});
    modal.onDidDismiss((data) => {
      if(data.mudou) {       
        this.lista.push(data.dados);
        this.listaView = this.exercicios.organizaSaida(this.lista);
      }
    })
    modal.present();
  }

  abrirExercicio(item, musculo) {
    let modal = this.modalCtrl.create(ExercicioPage, {item, musculo});
    modal.onDidDismiss((data) => {

      // Verifica se a ação realizada no modal foi de salvar o exercício
      if(data.mudou) {
        
        // Busca no vetor o exercício correspondente
        let aux = this.listaView.find((i) => i.musculo === data.dados.musculo).exercicios.find((j) => j.nome === data.dados.nome)
        aux.carga = data.dados.carga;
        aux.reps = data.dados.reps;
        aux.series = data.dados.series;
      }
    })
    modal.present();
  }

  salvar() {
    let toast = this.toastCtrl.create({
      duration: 1000,
      position: 'bottom'
    })

    console.log(this.lista)

    if(this.form.form.valid && this.lista.length > 0 && this.aluno) {
      this.lista.forEach(data => {
        this.dbServices.CriaTreino(this.aluno, this.user.nome, data.nome, data.carga, data.reps, data.series, null, this.foco)
      })
      
      toast.setMessage("Treino criado!");
      toast.present();
      this.navCtrl.pop();
    } else {
      if(!this.form.form.valid) {
        toast.setMessage("Preencha todos os campos");
      } else if(!this.aluno) {
        toast.setMessage("Selecione o aluno");
      } else if(this.lista.length == 0) {
        toast.setMessage("Adicione pelo menos um exercício")
      } 
    }
    toast.present();

  }

}
