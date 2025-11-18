import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEnvio } from '../../../interfaces/IEnvio';
import { IEnvioDTO } from '../../interfaces/IEnvioDTO';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-card-envio',
  imports: [CommonModule, RouterLink],
  templateUrl: './card-envio.html',
  styleUrl: './card-envio.scss',
})
export class CardEnvio {
  @Input() envio!:IEnvioDTO


  @Output() onDelete = new EventEmitter<number>();
  @Output() onUpdate = new EventEmitter<number>();

  atualizar() {
    this.onUpdate.emit(this.envio.id);
  }

  deletar() {
    if (confirm('Tem certeza que deseja excluir esse envio?')) {
      this.onDelete.emit(this.envio.id);
    }
  }
}
