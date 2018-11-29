import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { MeusTreinosPage } from '../pages/meus-treinos/meus-treinos';
import { TreinoPage } from '../pages/treino/treino';
import { ExercicioPage } from '../pages/exercicio/exercicio';
import { CriarTreinoPage } from '../pages/criar-treino/criar-treino';

@NgModule({
  declarations: [
    MyApp,
    MeusTreinosPage,
    TreinoPage,
    ExercicioPage,
    CriarTreinoPage,

    AboutPage,
    ContactPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MeusTreinosPage,
    TreinoPage,
    ExercicioPage,
    CriarTreinoPage,

    AboutPage,
    ContactPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
