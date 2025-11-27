import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ClienteService } from './service/cliente';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    if (!this.clienteService.isLogin()) {
      this.router.navigate(['/login']);
      return false;
    }

    const clienteLogado = localStorage.getItem('clienteLogado');
    
    if (clienteLogado) {
      const cliente = JSON.parse(clienteLogado);
      const cpf = cliente.id || cliente.cpf;
      const cpfNumero = typeof cpf === 'string' ? parseInt(cpf, 10) : cpf;

      return this.clienteService.carregar(cpfNumero).toPromise().then(
        (clienteCompleto) => {
          if (clienteCompleto && clienteCompleto.papel === 'ADMIN') {
            return true;
          } else {
            this.router.navigate(['/admin/acesso-negado']);
            return false;
          }
        },
        () => {
          this.router.navigate(['/admin/acesso-negado']);
          return false;
        }
      );
    }

    this.router.navigate(['/login']);
    return false;
  }
}


