import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { MeusTreinosPage } from '../meus-treinos/meus-treinos';
import { CriarTreinoPage } from '../criar-treino/criar-treino';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MeusTreinosPage;
  tab2Root = CriarTreinoPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
