import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImovelService } from '../../service/imovel';
import { Imovel } from '../../model/imovel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-adicionar-imovel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-adicionar-imovel.html',
  styleUrl: './admin-adicionar-imovel.css',
})
export class AdminAdicionarImovel {
  imovel: Imovel = new Imovel();
  mensagem: string = '';
  tipoMensagem: string = '';
  salvando: boolean = false;

  constructor(private imovelService: ImovelService) {}

  salvarImovel(): void {
    if (!this.imovel.tipo || !this.imovel['endereço'] || !this.imovel.valor) {
      this.mensagem = 'Por favor, preenchaa os campos obrigatórios.';
      this.tipoMensagem = 'erro';
      return;
    }

    this.salvando = true;
    this.imovelService.gravar(this.imovel).subscribe({
      next: () => {
        this.mensagem = 'Imóvel adicionado com sucesso!';
        this.tipoMensagem = 'sucesso';
        this.imovel = new Imovel();
        this.salvando = false;
      },
      error: () => {
        this.mensagem = 'Erro ao adicionar imóvel.';
        this.tipoMensagem = 'erro';
        this.salvando = false;
      }
    });
  }
}
