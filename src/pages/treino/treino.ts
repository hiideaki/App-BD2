import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, ToastController } from 'ionic-angular';
import { ExercicioPage } from '../exercicio/exercicio';
import { ExercicioProvider } from '../../providers/exercicio/exercicio';
import { ListaExerciciosPage } from '../lista-exercicios/lista-exercicios';

/**
 * Generated class for the TreinoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-treino',
  templateUrl: 'treino.html',
})
export class TreinoPage {

  dados: any;

  exercicios: ExercicioProvider = new ExercicioProvider();
  lista: any;
  listaView: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private modalCtrl: ModalController,
     private asController: ActionSheetController,
     private toastCtrl: ToastController) {

    this.dados = navParams.data;


    // O objeto vindo do BD deve ser alterado (no front-end, possivelmente) para estar nesse formato:
    this.lista = [
      {
        musculo: "Perna",
        nome: "Leg-press",
        carga: "80",
        series: "3",
        reps: "12"
      },
      {
        musculo: "Perna",
        nome: "Adutora",
        carga: "20",
        series: "3",
        reps: "12"
      },
      {
        musculo: "Perna",
        nome: "Mesa romana",
        carga: "80",
        series: "3",
        reps: "10"
      },
      {
        musculo: "Bíceps",
        nome: "Rosca direta",
        carga: "15",
        series: "3",
        reps: "12"
      },
      {
        musculo: "Bíceps",
        nome: "Rosca scotch",
        carga: "10",
        series: "3",
        reps: "10"
      },
      {
        musculo: "Costas",
        nome: "Pulley alto inclinado",
        carga: "30",
        series: "3",
        reps: "12"
      },
      {
        musculo: "Costas",
        nome: "Remada baixa",
        carga: "45",
        series: "3",
        reps: "12"
      }
    ]
    this.listaView = this.exercicios.organizaSaida(this.lista);
  }

  more(item) {
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
            this.listaView = this.exercicios.organizaSaida(this.lista)
            toast.present();
          }
        }
      ]
    })
    c.present();
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

  salvar() {
    let toast = this.toastCtrl.create({
      duration: 1000,
      position: 'bottom'
    })
    if(this.lista.length > 0) {
      console.log("Salvar no BD");
      toast.setMessage("Treino salvo!");
      toast.present();
      this.navCtrl.pop();
    } else {
      toast.setMessage("Adicione pelo menos um exercício");
      toast.present();
    }
  }

}
