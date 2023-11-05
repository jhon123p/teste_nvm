import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { DadosService } from '../dados.service';


@Component({
  selector: 'app-new-lembrete',
  templateUrl: './new-lembrete.page.html',
  styleUrls: ['./new-lembrete.page.scss'],
})
export class NewLembretePage implements OnInit {

  meuForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private rota:NavController ,
    private storage:Storage,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private dadosService: DadosService) { 

      this.meuForm = this.formBuilder.group({
        nome: ['',Validators.required],
        email: ['',Validators.required],
        telefone:['',Validators.required]
      });
  }

  async ngOnInit() {
    await this.storage.create();
  }

  async visualizarDados() {
    const dadosArmazenados = await this.storage.get('dadosFormulario');
    console.log('Dados armazenados: ', dadosArmazenados);
  }

  async mostrarAlerta(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  submitForm() {
    
    if (this.meuForm.valid) {
      const dadosFormulario = this.meuForm.value;
      this.dadosService.setDados(dadosFormulario);

    if (!dadosFormulario.nome || !dadosFormulario.email) {
      this.mostrarAlerta('Campos Vazios', 'Por favor, preencha todos os campos obrigatórios.');
      return; // Encerre a função se os campos estiverem vazios
    }
  
      this.storage.get('dadosFormulario').then((existingData) => {
        if (existingData) {
          // Se já existe algum dado salvo, você pode verificar se os novos dados são diferentes
          if (JSON.stringify(existingData) !== JSON.stringify(dadosFormulario)) {
            // Os dados são diferentes, então você pode salvar novamente

            if (this.selectedImage) {
              dadosFormulario.imagem = this.selectedImage; // Adicione a imagem aos dados do formulário
            }

            this.storage.set('dadosFormulario', dadosFormulario).then(() => {
              console.log('Dados do formulário (incluindo a imagem) salvos no Local Storage');
            });

          } else {
            console.log('Os dados são iguais, não há necessidade de salvar novamente.');
            this.mostrarAlerta('2d2d2d','wefg');
          }

        } else {
          // Nenhum dado existente encontrado, então você pode salvar diretamente
          if (this.selectedImage) {
            dadosFormulario.imagem = this.selectedImage; // Adicione a imagem aos dados do formulário
          }
          
          this.storage.set('dadosFormulario', dadosFormulario).then(() => {
            console.log('Dados do formulário (incluindo a imagem) salvos no Local Storage');
          });
        }
        
      });
      
    }else {
      this.mostrarAlerta('Campos Inválidos', 'Por favor, preencha os campos corretamente.');
    }
    
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.selectedImage = reader.result;
    };

    reader.readAsDataURL(file);
  }
  returnHome(){
    this.rota.navigateForward("/home")
  }
  
}
