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
  loadedItems: any = 2; // Inicialmente carrega 2 itens


  constructor(private dadosService: DadosService , private rota:NavController) { }

  apagar(item: any) {
    // Encontrar o índice do item na lista exibida
    const index = this.dadosExibicao.indexOf(item);
  
    if (index !== -1) {
      // Remover o item da lista exibida
      this.dadosExibicao.splice(index, 1);
      
      // Remover o item do Local Storage
      this.removerItemLocalStorage(item);
      
      console.log('Item removido da lista e do Local Storage:', item);
    }
  }
  
  removerItemLocalStorage(item: any) {
    // Obter a lista atual do Local Storage
    const todasAsChaves = Object.keys(localStorage);
    const todosOsItens = todasAsChaves.map(chave => JSON.parse(localStorage.getItem(chave)!));

  
    // Encontrar o índice do item no Local Storage
    const indexNoLocalStorage = todasAsChaves.findIndex((element: any) => {
      // Lógica para comparar os itens. Adapte conforme necessário.
      return element.nome === item.nome; 
    });
  
    // Remover o item do Local Storage se encontrado
    if (indexNoLocalStorage !== -1) {
      todosOsItens.splice(indexNoLocalStorage, 1);
      // Atualizar o Local Storage com a lista modificada
      localStorage.setItem('dadosExibicao', JSON.stringify(todosOsItens));
    }
  }
  
  

  carregarMaisItens() {
    this.loadedItems += 1; // Aumenta o número de itens em 2
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
