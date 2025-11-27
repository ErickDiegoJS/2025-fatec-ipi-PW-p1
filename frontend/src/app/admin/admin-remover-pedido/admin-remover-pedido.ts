import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../service/pedido';
import { Pedido } from '../../model/pedido';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-remover-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-remover-pedido.html',
  styleUrl: './admin-remover-pedido.css',
})
export class AdminRemoverPedido {
  codigo: number = 0;
  mensagem: string = '';
  tipoMensagem: string = '';
  removendo: boolean = false;

  constructor(private pedidoService: PedidoService) {}

  removerPedido(): void {
    if (!this.codigo) {
      this.mensagem = 'Por favor, insira um código válido.';
      this.tipoMensagem = 'erro';
      return;
    }

    if (!confirm('Tem certeza que deseja remover este pedido?')) {
      return;
    }

    this.removendo = true;
    this.pedidoService.apagar(this.codigo).subscribe({
      next: () => {
        this.mensagem = 'Pedido removido com sucesso!';
        this.tipoMensagem = 'sucesso';
        this.codigo = 0;
        this.removendo = false;
      },
      error: () => {
        this.mensagem = 'Erro ao remover pedido.';
        this.tipoMensagem = 'erro';
        this.removendo = false;
      }
    });
  }
}
