import "reflect-metadata";
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UsuarioProvider } from '../providers/usuario/usuario';
import { LoginPage } from '../pages/login/login';
import { createConnection } from 'typeorm';
import { Alunos } from "../providers/modelos/alunos";
import { Endereco } from "../providers/modelos/endereco";
import { Exercicio_Info } from "../providers/modelos/exercicio_info";
import { Exercicios } from "../providers/modelos/exercicio";
import { Planos } from "../providers/modelos/planos";
import { Treinadores } from "../providers/modelos/treinador";
import { Treinos } from "../providers/modelos/treino";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(async () => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      splashScreen.hide();

      if(platform.is('cordova')) {
        // Running on device or emulator
        await createConnection({
          type: 'cordova',
          database: 'test',
          location: 'default',
          logging: ['error', 'query', 'schema'],
          synchronize: true,
          entities: [
            Alunos,
            Endereco,
            Exercicio_Info, 
            Exercicios, 
            Planos, 
            Treinadores, 
            Treinos
          ]
        });
      } else {
        // Running app in browser
        await createConnection({
          type: 'sqljs',
          autoSave: true,
          location: 'browser',
          logging: ['error', 'query', 'schema'],
          synchronize: true,
          entities: [
            Alunos,
            Endereco,
            Exercicio_Info, 
            Exercicios, 
            Planos, 
            Treinadores, 
            Treinos
          ]
        })
      }
    });
  }

}
