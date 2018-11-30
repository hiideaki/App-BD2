import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaExerciciosPage } from './lista-exercicios';

@NgModule({
  declarations: [
    ListaExerciciosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaExerciciosPage),
  ],
})
export class ListaExerciciosPageModule {}
