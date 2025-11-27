import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ClienteService } from './service/cliente';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Verifica se o usuário está logado
    if (this.clienteService.isLogin()) {
      return true; // Permite acesso à rota
    }

    // Se não estiver logado, redireciona para login
    this.router.navigate(['/login']);
    return false; // Bloqueia a navegação
  }
}
