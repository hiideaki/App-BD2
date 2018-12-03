import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarExercicioPage } from './criar-exercicio';

@NgModule({
  declarations: [
    CriarExercicioPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarExercicioPage),
  ],
})
export class CriarExercicioPageModule {}
