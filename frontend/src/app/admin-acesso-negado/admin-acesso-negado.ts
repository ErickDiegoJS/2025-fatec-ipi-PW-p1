import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-acesso-negado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-acesso-negado.html',
  styleUrl: './admin-acesso-negado.css',
})
export class AdminAcessoNegado {
  constructor(private router: Router) {}

  irParaHome(): void {
    this.router.navigate(['/home']);
  }
}
