import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera } from '@ionic-native/camera';
import { StreamingMedia } from '@ionic-native/streaming-media';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { MeusTreinosPage } from '../pages/meus-treinos/meus-treinos';
import { TreinoPage } from '../pages/treino/treino';
import { ExercicioPage } from '../pages/exercicio/exercicio';
import { CriarTreinoPage } from '../pages/criar-treino/criar-treino';
import { ListaExerciciosPage } from '../pages/lista-exercicios/lista-exercicios';
import { ExercicioProvider } from '../providers/exercicio/exercicio';
import { ListaAlunosPage } from '../pages/lista-alunos/lista-alunos';
import { MeusAlunosPage } from '../pages/meus-alunos/meus-alunos';
import { PerfilPage } from '../pages/perfil/perfil';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { LoginPage } from '../pages/login/login';
import { TrocarSenhaPage } from '../pages/trocar-senha/trocar-senha';
import { CriarExercicioPage } from '../pages/criar-exercicio/criar-exercicio';

@NgModule({
  declarations: [
    MyApp,
    MeusTreinosPage,
    TreinoPage,
    ExercicioPage,
    CriarTreinoPage,
    CriarExercicioPage,
    ListaExerciciosPage,
    ListaAlunosPage,
    MeusAlunosPage,
    PerfilPage,
    LoginPage,
    TrocarSenhaPage,
    
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
    CriarExercicioPage,
    ListaExerciciosPage,
    ListaAlunosPage,
    MeusAlunosPage,
    PerfilPage,
    LoginPage,
    TrocarSenhaPage,

    AboutPage,
    ContactPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ExercicioProvider,
    UsuarioProvider,
    PhotoViewer,
    Camera,
    StreamingMedia,
  ]
})
export class AppModule {}
