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
  submitForm() {
    if (this.meuForm.valid) {
      const dadosFormulario = this.meuForm.value;
      this.dadosService.setDados(dadosFormulario);
  
      if (!dadosFormulario.nome || !dadosFormulario.email) {
        this.mostrarAlerta('Campos Vazios', 'Por favor, preencha todos os campos obrigatórios.');
        return; // Encerre a função se os campos estiverem vazios
      }
  
      this.storage.get('dadosFormulario').then((existingData) => {
        let dataToSave: any[] = [];
  
        if (existingData && Array.isArray(existingData)) {
          dataToSave = existingData;
  
          // Verifique se os novos dados já existem no array
          const isDuplicate = dataToSave.some((item) => {
            return JSON.stringify(item) === JSON.stringify(dadosFormulario);
          });
  
          if (isDuplicate) {
            console.log('Dados iguais, não serão salvos novamente.');
            this.mostrarAlerta('Dados Iguais', 'Os dados já existem.');
            return; // Encerre a função se os dados forem iguais
          }
        }
  
        if (this.selectedImage) {
          dadosFormulario.imagem = this.selectedImage; // Adicione a imagem aos dados do formulário
        }
  
        dataToSave.push(dadosFormulario); // Adicione os novos dados ao array
  
        this.storage.set('dadosFormulario', dataToSave).then(() => {
          console.log('Dados do formulário (incluindo a imagem) salvos no Local Storage');
        });
      });
  
    } else {
      this.mostrarAlerta('Campos Inválidos', 'Por favor, preencha os campos corretamente.');
    }
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
