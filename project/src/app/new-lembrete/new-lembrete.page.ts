import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {NavController} from '@ionic/angular'

@Component({
  selector: 'app-new-lembrete',
  templateUrl: './new-lembrete.page.html',
  styleUrls: ['./new-lembrete.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NewLembretePage implements OnInit {

  constructor(private rota:NavController) { }

  returnHome(){
    this.rota.navigateForward('/home')
  }

  ngOnInit() {
  }

}
