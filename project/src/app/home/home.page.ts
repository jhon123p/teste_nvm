import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{
  dadosSalvos: any[] = [];
  dadosExibicao: any[] =[];
  loadedItems: number = 2; // Inicialmente carrega 2 itens


  constructor(private dadosService: DadosService , private rota:NavController) { }

  carregarMaisItens() {
    this.loadedItems += 2; // Aumenta o número de itens em 2
    this.dadosExibicao = this.dadosSalvos.slice(0, this.loadedItems); // Atualiza a exibição com mais itens
  }
  

  ngOnInit() {
    this.dadosService.recuperarDados().then((dados) => {
      this.dadosSalvos = dados || [];
      this.dadosExibicao = this.dadosSalvos.slice(0, 2); // Configure this.dadosExibicao após a recuperação de dados
    });
  }
  
  navNewLembrete() {
    this.rota.navigateRoot('/new-lembrete');
  }
  visualizarDados() {
    // Se desejar, você pode adicionar lógica aqui para exibir os dados de outra maneira
  }
  
}
