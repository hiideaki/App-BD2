import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ExercicioProvider } from '../../providers/exercicio/exercicio';
import { ExercicioPage } from '../exercicio/exercicio';

/**
 * Generated class for the ListaExerciciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-exercicios',
  templateUrl: 'lista-exercicios.html',
})
export class ListaExerciciosPage {

  private exercicio: ExercicioProvider = new ExercicioProvider();
  private lista: any;
  private listaView: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private modalCtrl: ModalController) {
    this.lista = [
      {
        musculo: "Perna",
        nome: "Leg-press",
        carga: "",
        series: "",
        reps: ""
      },
      {
        musculo: "Perna",
        nome: "Adutora",
        carga: "",
        series: "",
        reps: ""
      },
      {
        musculo: "Perna",
        nome: "Mesa romana",
        carga: "",
        series: "",
        reps: ""
      },
      {
        musculo: "Biceps",
        nome: "Rosca direta",
        carga: "",
        series: "",
        reps: ""
      },
      {
        musculo: "Biceps",
        nome: "Rosca scotch",
        carga: "",
        series: "",
        reps: ""
      },
      {
        musculo: "Costas",
        nome: "Pulley alto inclinado",
        carga: "",
        series: "",
        reps: ""
      },
      {
        musculo: "Costas",
        nome: "Remada baixa",
        carga: "",
        series: "",
        reps: ""
      },
      {
        musculo: "Costas",
        nome: "Cavalinho",
        carga: "",
        series: "",
        reps: ""
      }
    ]

    let aux = navParams.data.lista
    
    if(aux.length > 0) {
      this.lista = this.lista.filter((item) => !aux.some((i) => i.nome === item.nome))
    }

    this.listaView = this.exercicio.organizaSaida(this.lista)

  }

  ionViewDidLoad() {
  }


  abrirExercicio(item, musculo) {
    let modal = this.modalCtrl.create(ExercicioPage, {item, musculo})
    modal.onDidDismiss((data) => {

      // Verifica se a ação realizada no modal foi de salvar o exercício
      if(data.mudou) {
        this.viewCtrl.dismiss({ mudou: true, dados: data.dados });
      }
    })
    modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss({ mudou: false, dados: null });
  }

}
