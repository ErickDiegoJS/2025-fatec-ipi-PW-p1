import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../service/pedido';
import { Pedido } from '../../model/pedido';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-editar-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-editar-pedido.html',
  styleUrl: './admin-editar-pedido.css',
})
export class AdminEditarPedido implements OnInit {
  pedido: Pedido | null = null;
  codigo: number = 0;
  mensagem: string = '';
  tipoMensagem: string = '';
  carregando: boolean = false;
  salvando: boolean = false;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {}

  buscarPedido(): void {
    if (!this.codigo) {
      this.mensagem = 'Por favor, insira um código válido.';
      this.tipoMensagem = 'erro';
      return;
    }

    this.carregando = true;
    this.pedidoService.carregar(this.codigo).subscribe({
      next: (data) => {
        this.pedido = data;
        this.carregando = false;
        this.mensagem = '';
      },
      error: () => {
        this.mensagem = 'Erro ao carregar pedido.';
        this.tipoMensagem = 'erro';
        this.carregando = false;
      }
    });
  }

  salvarAlteracoes(): void {
    if (!this.pedido) {
      this.mensagem = 'Nenhum pedido carregado.';
      this.tipoMensagem = 'erro';
      return;
    }

    this.salvando = true;
    this.pedidoService.alterar(this.pedido).subscribe({
      next: () => {
        this.mensagem = 'Pedido alterado com sucesso!';
        this.tipoMensagem = 'sucesso';
        this.salvando = false;
      },
      error: () => {
        this.mensagem = 'Erro ao salvar alterações.';
        this.tipoMensagem = 'erro';
        this.salvando = false;
      }
    });
  }
}
