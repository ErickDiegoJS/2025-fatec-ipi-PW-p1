import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../service/cliente';
import { Cliente as ClienteModel } from '../model/cliente';

@Component({
  selector: 'app-cliente',
  imports: [CommonModule, RouterLink],
  templateUrl: './cliente.html',
  styleUrl: './cliente.css',
})
export class Cliente implements OnInit {
  clienteLogado: ClienteModel | null = null;
  carregando: boolean = true;
  erro: string = '';

  constructor(
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    // Verifica se o usuário é admin
    const clienteArmazenado = localStorage.getItem('clienteLogado');
    if (clienteArmazenado) {
      const clienteTemp = JSON.parse(clienteArmazenado);
      if (clienteTemp.papel === 'ADMIN') {
        // Redireciona para admin se for admin
        this.router.navigate(['/admin']);
        return;
      }
    }
    
    this.carregarDadosCliente();
  }

  carregarDadosCliente(): void {
    const clienteArmazenado = localStorage.getItem('clienteLogado');
    
    if (clienteArmazenado) {
      const clienteTemp = JSON.parse(clienteArmazenado);
      
      const identificador = clienteTemp.cpf || clienteTemp.id;
      
      if (!identificador && identificador !== 0) {
        console.error('CPF ou ID não encontrado no localStorage:', clienteTemp);
        this.erro = 'Identificador não encontrado. Faça login novamente.';
        this.carregando = false;
        this.router.navigate(['/login']);
        return;
      }
      
      const cpf = typeof identificador === 'string' 
        ? parseInt(identificador, 10) 
        : identificador;
      
      console.log('CPF/ID para enviar:', cpf, 'Tipo:', typeof cpf);
      
      this.clienteService.carregar(cpf).subscribe({
        next: (cliente: ClienteModel) => {
          console.log('Dados carregados com sucesso:', cliente);
          this.clienteLogado = cliente;
          this.carregando = false;
        },
        error: (erro) => {
          console.error('Erro ao carregar dados do cliente:', erro);
          console.error('Status:', erro.status);
          console.error('Body:', erro.error);
          
          // Fallback: usa dados do localStorage se houver erro
          console.warn('Usando dados do localStorage como fallback');
          this.clienteLogado = clienteTemp;
          this.carregando = false;
          this.erro = '';
        }
      });
    } else {
      this.erro = 'Nenhum cliente logado encontrado';
      this.carregando = false;
      // Redireciona para login se não houver cliente logado
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    // Remove os dados do cliente do localStorage
    localStorage.removeItem('clienteLogado');
    this.clienteLogado = null;
    this.router.navigate(['/login']);
  }
}
