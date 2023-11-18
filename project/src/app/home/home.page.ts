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

  apagar(item: any) {
    const index = this.dadosExibicao.indexOf(item);
    if (index !== -1) {
      this.dadosExibicao.splice(index, 1);
      this.removerItemLocalStorage(item.id); // Aqui o ID único está na propriedade 'id'
      console.log('Item removido da lista e do Local Storage:', item.id);
    }
  }
  
  removerItemLocalStorage(itemId: string) {
    const storedItemsString = localStorage.getItem('dadosExibicao');
    if (storedItemsString) {
      const storedItems: any[] = JSON.parse(storedItemsString);
      const indexNoLocalStorage = storedItems.findIndex((element: any) => {
        return element.id === itemId;
      });
      if (indexNoLocalStorage !== -1) {
        storedItems.splice(indexNoLocalStorage, 1);
        localStorage.setItem('dadosExibicao', JSON.stringify(storedItems));
      }
    }
  }
  
  
  ngOnInit() {
    this.dadosService.recuperarDados().then((dados) => {
      this.dadosSalvos = dados || [];
      this.dadosExibicao = this.dadosSalvos.slice(0, 2); // Configure this.dadosExibicao após a recuperação de dados
    });
  }
  
  

  
  
  carregarMaisItens() {
    this.loadedItems += 1; // Aumenta o número de itens em 2
    this.dadosExibicao = this.dadosSalvos.slice(0, this.loadedItems); // Atualiza a exibição com mais itens
  }
  
  navNewLembrete() {
    this.rota.navigateRoot('/new-lembrete');
  }
  visualizarDados() {
    
  }
  
}
