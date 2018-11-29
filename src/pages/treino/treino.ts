import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ExercicioPage } from '../exercicio/exercicio';

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
  treino: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    console.log(navParams.data)
    this.dados = navParams.data;


    // O objeto vindo do BD deve ser alterado (no front-end, possivelmente) para estar nesse formato:
    this.treino = [
      {
        musculo: "Perna",
        exercicios: [
          {
            nome: "Leg-press",
            carga: "80",
            series: "3",
            reps: "12"
          },
          {
            nome: "Adutora",
            carga: "20",
            series: "3",
            reps: "12"
          },
          {
            nome: "Mesa romana",
            carga: "80",
            series: "3",
            reps: "10"
          }
        ]
      },
      {
        musculo: "Bíceps",
        exercicios: [
          {
            nome: "Rosca direta",
            carga: "15",
            series: "3",
            reps: "12"
          },
          {
            nome: "Rosca scotch",
            carga: "10",
            series: "3",
            reps: "10"
          }
        ]
      },
      {
        musculo: "Costas",
        exercicios: [
          {
            nome: "Pulley alto inclinado",
            carga: "30",
            series: "3",
            reps: "12"
          },
          {
            nome: "Remada baixa",
            carga: "45",
            series: "3",
            reps: "12"
          }
        ]
      }
    ]

  }

  abrirExercicio(item, grupo) {
    let modal = this.modalCtrl.create(ExercicioPage, item);
    modal.onDidDismiss((data) => {

      // Verifica se a ação realizada no modal foi de salvar o exercício
      if(data.mudou) {

        // Itera no vetor de treino
        this.treino.forEach((elemento) => {
  
          // Busca pelo grupo de músculos do exercício
          if(elemento.musculo === grupo) {
  
            // Itera nos exercícios daquele grupo de músculos
            elemento.exercicios.forEach((exercicio) => {
  
              // Busca pelo exercício com o nome procurado
              if(exercicio.nome === data.dados.nome) {
                exercicio.carga = data.dados.carga;
                exercicio.reps = data.dados.reps;
                exercicio.series = data.dados.series;
              }
            })
          }
        })
      }
    })
    modal.present();
  }

}
