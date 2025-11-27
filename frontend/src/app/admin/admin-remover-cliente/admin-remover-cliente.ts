import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../service/cliente';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-remover-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-remover-cliente.html',
  styleUrl: './admin-remover-cliente.css',
})
export class AdminRemoverCliente {
  cpf: number = 0;
  mensagem: string = '';
  tipoMensagem: string = '';
  removendo: boolean = false;

  constructor(private clienteService: ClienteService) {}

  removerCliente(): void {
    if (!this.cpf) {
      this.mensagem = 'Por favor, insira um CPF válido.';
      this.tipoMensagem = 'erro';
      return;
    }

    if (!confirm('Tem certeza que deseja remover este cliente? Esta ação não pode ser desfeita.')) {
      return;
    }

    this.removendo = true;
    this.clienteService.remover(this.cpf).subscribe({
      next: () => {
        this.mensagem = 'Cliente removido com sucesso!';
        this.tipoMensagem = 'sucesso';
        this.cpf = 0;
        this.removendo = false;
      },
      error: () => {
        this.mensagem = 'Erro ao remover cliente.';
        this.tipoMensagem = 'erro';
        this.removendo = false;
      }
    });
  }
}
