import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarTreinoPage } from './criar-treino';

@NgModule({
  declarations: [
    CriarTreinoPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarTreinoPage),
  ],
})
export class CriarTreinoPageModule {}
