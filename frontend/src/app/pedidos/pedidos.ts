import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../model/pedido';
import { Cliente } from '../model/cliente';
import { Imovel } from '../model/imovel';
import { PedidoService } from '../service/pedido';
import { ClienteService } from '../service/cliente';
import { ImovelService } from '../service/imovel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedidos',
  imports: [FormsModule, CommonModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit {
  pedido: Pedido = new Pedido();
  cliente: Cliente | null = null;
  imovel: Imovel | null = null;
  codigoImovel: number = 0;
  cpfCliente: number = 0;
  carregando: boolean = true;
  mensagem: string = '';
  tipoMensagem: string = '';
  salvando: boolean = false;
  pedidoConfirmado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private imovelService: ImovelService
  ) {}

  ngOnInit(): void {
    // Obter código do imóvel da URL
    this.route.params.subscribe((params) => {
      if (params['codigo']) {
        this.codigoImovel = Number(params['codigo']);
      }
    });

    // Obter CPF do cliente do localStorage
    const clienteLogado = localStorage.getItem('clienteLogado');
    if (clienteLogado) {
      const clienteData = JSON.parse(clienteLogado);
      this.cpfCliente = clienteData.id;
    }

    // Carregar dados do cliente e imóvel
    this.carregarDados();
  }

  private carregarDados(): void {
    this.carregando = true;

    // Carregar cliente
    this.clienteService.carregar(this.cpfCliente).subscribe({
      next: (dadosCliente) => {
        this.cliente = dadosCliente;
        this.pedido.cpf = dadosCliente.cpf;
        this.pedido.nome = dadosCliente.nome;

        // Carregar imóvel
        this.imovelService.carregar(this.codigoImovel).subscribe({
          next: (dadosImovel) => {
            this.imovel = dadosImovel;
            this.pedido.codigo_imovel = dadosImovel.codigo;
            this.pedido.valor = dadosImovel.valor;
            this.carregando = false;
          },
          error: () => {
            this.mensagem = 'Erro ao carregar dados do imóvel.';
            this.tipoMensagem = 'erro';
            this.carregando = false;
          }
        });
      },
      error: () => {
        this.mensagem = 'Erro ao carregar dados do cliente.';
        this.tipoMensagem = 'erro';
        this.carregando = false;
      }
    });
  }

  confirmarPedido(): void {
    if (!this.cliente || !this.imovel) {
      this.mensagem = 'Erro ao carregar dados. Tente novamente.';
      this.tipoMensagem = 'erro';
      return;
    }

    this.salvando = true;

    this.pedido.codigo = Date.now();

    this.pedidoService.gravar(this.pedido).subscribe({
      next: () => {
        
        // Alterar status do imóvel para "indisponivel"
        if (this.imovel) {
          this.imovel.status = 'indisponivel';
          this.imovelService.alterar(this.imovel).subscribe({
            next: () => {
              this.mensagem = 'Pedido realizado com sucesso! Verifique seu e-mail.';
              this.tipoMensagem = 'sucesso';
              this.pedidoConfirmado = true;
              this.salvando = false;
            },
            error: () => {
              this.mensagem = 'Pedido realizado com sucesso! Verifique seu e-mail.';
              this.tipoMensagem = 'sucesso';
              this.pedidoConfirmado = true;
              this.salvando = false;
            }
          });
        } else {
          this.mensagem = 'Pedido realizado com sucesso! Verifique seu e-mail.';
          this.tipoMensagem = 'sucesso';
          this.pedidoConfirmado = true;
          this.salvando = false;
        }
      },
      error: () => {
        this.mensagem = 'Erro ao confirmar pedido. Tente novamente.';
        this.tipoMensagem = 'erro';
        this.salvando = false;
      }
    });
  }

  irParaInicio(): void {
    this.router.navigate(['/home']);
  }
}
