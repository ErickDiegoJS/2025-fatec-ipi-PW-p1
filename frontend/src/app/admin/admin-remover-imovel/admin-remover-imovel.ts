import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImovelService } from '../../service/imovel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-remover-imovel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-remover-imovel.html',
  styleUrl: './admin-remover-imovel.css',
})
export class AdminRemoverImovel {
  codigo: number = 0;
  mensagem: string = '';
  tipoMensagem: string = '';
  removendo: boolean = false;

  constructor(private imovelService: ImovelService) {}

  removerImovel(): void {
    if (!this.codigo) {
      this.mensagem = 'Por favor, insira um código válido.';
      this.tipoMensagem = 'erro';
      return;
    }

    if (!confirm('Tem certeza que deseja remover este imóvel? Esta ação não pode ser desfeita.')) {
      return;
    }

    this.removendo = true;
    this.imovelService.remover(this.codigo).subscribe({
      next: () => {
        this.mensagem = 'Imóvel removido com sucesso!';
        this.tipoMensagem = 'sucesso';
        this.codigo = 0;
        this.removendo = false;
      },
      error: () => {
        this.mensagem = 'Erro ao remover imóvel.';
        this.tipoMensagem = 'erro';
        this.removendo = false;
      }
    });
  }
}
