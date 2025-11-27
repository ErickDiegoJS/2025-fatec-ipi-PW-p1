import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '../model/pedido';
import { PedidoService } from '../service/pedido';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meus-pedidos',
  imports: [CommonModule],
  templateUrl: './meus-pedidos.html',
  styleUrl: './meus-pedidos.css',
})
export class MeusPedidos implements OnInit {
  pedidos: Pedido[] = [];
  cpfCliente: number = 0;
  carregando: boolean = true;
  mensagem: string = '';

  constructor(
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obter CPF do cliente do localStorage
    const clienteLogado = localStorage.getItem('clienteLogado');
    if (clienteLogado) {
      const clienteData = JSON.parse(clienteLogado);
      this.cpfCliente = clienteData.id;
      this.carregarPedidos();
    } else {
      this.mensagem = 'Você não está logado. Redirecionando...';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    }
  }

  private carregarPedidos(): void {
    this.carregando = true;

    this.pedidoService.listarPorCpf(this.cpfCliente).subscribe({
      next: (listaPedidos) => {
        this.pedidos = listaPedidos;
        this.carregando = false;

        if (this.pedidos.length === 0) {
          this.mensagem = 'Você ainda não tem pedidos.';
        }
      },
      error: () => {
        this.mensagem = 'Erro ao carregar seus pedidos.';
        this.carregando = false;
      }
    });
  }
}
