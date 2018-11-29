import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { MeusTreinosPage } from '../meus-treinos/meus-treinos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MeusTreinosPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
