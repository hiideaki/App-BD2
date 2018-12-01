import { Component } from '@angular/core';

import { MeusTreinosPage } from '../meus-treinos/meus-treinos';
import { MeusAlunosPage } from '../meus-alunos/meus-alunos';
import { PerfilPage } from '../perfil/perfil';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MeusTreinosPage;
  tab2Root = MeusAlunosPage;
  tab3Root = PerfilPage;

  constructor(private user: UsuarioProvider) {

  }
}
