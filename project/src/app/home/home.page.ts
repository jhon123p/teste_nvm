import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dados: any;

  constructor( private rota:NavController , private dadosService: DadosService) {
    
  }
  navNewLembrete() {
    this.rota.navigateForward('/new-lembrete');
  }
  ionViewWillEnter() {
    // Recupere os dados do serviço
    this.dados = this.dadosService.getDados();
  }
  visualizarDados() {
    // Se desejar, você pode adicionar lógica aqui para exibir os dados de outra maneira
  }
  
}
