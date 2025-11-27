import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../service/pedido';
import { Pedido } from '../../model/pedido';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-adicionar-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-adicionar-pedido.html',
  styleUrl: './admin-adicionar-pedido.css',
})
export class AdminAdicionarPedido {
  pedido: Pedido = new Pedido();
  mensagem: string = '';
  tipoMensagem: string = '';
  salvando: boolean = false;

  constructor(private pedidoService: PedidoService) {}

  salvarPedido(): void {
    if (!this.pedido.cpf || !this.pedido.nome || !this.pedido.codigo_imovel || !this.pedido.valor) {
      this.mensagem = 'Por favor, preencha todos os campos obrigatórios.';
      this.tipoMensagem = 'erro';
      return;
    }

    this.salvando = true;
    this.pedido.codigo = Date.now();

    this.pedidoService.gravar(this.pedido).subscribe({
      next: () => {
        this.mensagem = 'Pedido adicionado com sucesso!';
        this.tipoMensagem = 'sucesso';
        this.pedido = new Pedido();
        this.salvando = false;
      },
      error: (erro) => {
        console.error('Erro ao salvar pedido:', erro);
        this.mensagem = 'Erro ao adicionar pedido.';
        this.tipoMensagem = 'erro';
        this.salvando = false;
      }
    });
  }
}
