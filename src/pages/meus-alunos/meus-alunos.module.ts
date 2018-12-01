import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusAlunosPage } from './meus-alunos';

@NgModule({
  declarations: [
    MeusAlunosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusAlunosPage),
  ],
})
export class MeusAlunosPageModule {}
