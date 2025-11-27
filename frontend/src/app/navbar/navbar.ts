import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { ClienteService } from '../service/cliente';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {
  isLogado: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verifica login ao inicializar
    this.atualizarStatusLogin();

    // Verifica login sempre que a rota muda
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.atualizarStatusLogin();
      });
  }

  atualizarStatusLogin(): void {
    this.isLogado = this.clienteService.isLogin();
  }

  irParaPerfil(): void {
    if (!this.isLogado) {
      this.router.navigate(['/login']);
      return;
    }

    // Obtém o cliente do localStorage
    const clienteLogado = localStorage.getItem('clienteLogado');
    if (clienteLogado) {
      const cliente = JSON.parse(clienteLogado);
      const id = cliente.id; // id é o cpf

      // Busca os dados completos do cliente no BD para verificar o papel
      this.clienteService.carregar(id).subscribe({
        next: (clienteCompleto) => {
          if (clienteCompleto.papel === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/cliente']);
          }
        },
        error: () => {
          this.router.navigate(['/cliente']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
