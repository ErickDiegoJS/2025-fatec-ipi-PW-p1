import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ClienteService } from '../service/cliente';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  clienteNome: string = '';
  carregando: boolean = true;

  constructor(
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    // Obtém o nome do cliente logado
    const clienteLogado = localStorage.getItem('clienteLogado');
    if (clienteLogado) {
      const cliente = JSON.parse(clienteLogado);
      this.clienteNome = cliente.nome || 'Administrador';
      
      const cpf = cliente.id || cliente.cpf;
      
      // Busca os dados completos para verificar se é admin
      this.clienteService.carregar(cpf).subscribe({
        next: (clienteCompleto) => {
          if (clienteCompleto.papel === 'ADMIN') {
            this.carregando = false;
          } else {
            this.router.navigate(['/admin/acesso-negado']);
          }
        },
        error: () => {
          this.router.navigate(['/admin/acesso-negado']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    localStorage.removeItem('clienteLogado');
    this.router.navigate(['/login']);
  }
}
