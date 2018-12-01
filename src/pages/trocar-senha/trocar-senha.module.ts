import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrocarSenhaPage } from './trocar-senha';

@NgModule({
  declarations: [
    TrocarSenhaPage,
  ],
  imports: [
    IonicPageModule.forChild(TrocarSenhaPage),
  ],
})
export class TrocarSenhaPageModule {}
