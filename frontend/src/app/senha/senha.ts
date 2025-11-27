import { Component } from '@angular/core';
import { ClienteService } from '../service/cliente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-senha',
  imports: [FormsModule, CommonModule],
  templateUrl: './senha.html',
  styleUrl: './senha.css',
})
export class Senha {
  cpf: number = 0;
  email: string = '';
  mensagem: string = '';
  tipoMensagem: string = ''; // 'sucesso' ou 'erro'
  enviando: boolean = false;

  constructor(private clienteService: ClienteService) {}

  enviarEmailSenha(): void {
    // Validar se CPF ou email foram preenchidos
    if (!this.cpf && !this.email) {
      this.mensagem = 'Por favor, insira o CPF ou e-mail.';
      this.tipoMensagem = 'erro';
      return;
    }

    // Se CPF foi preenchido, usar para buscar
    if (this.cpf) {
      this.buscarEEnviarPorCpf();
    } else if (this.email) {
      // Se apenas email foi preenchido, buscar todos e verificar
      this.buscarEEnviarPorEmail();
    }
  }

  private buscarEEnviarPorCpf(): void {
    this.enviando = true;
    this.clienteService.carregar(this.cpf).subscribe({
      next: (cliente) => {
        if (cliente && cliente.cpf) {
          this.enviarEmail(cliente.cpf);
        } else {
          this.mensagem = 'Cliente não encontrado com este CPF.';
          this.tipoMensagem = 'erro';
          this.enviando = false;
        }
      },
      error: () => {
        this.mensagem = 'Cliente não encontrado. Verifique o CPF.';
        this.tipoMensagem = 'erro';
        this.enviando = false;
      }
    });
  }

  private buscarEEnviarPorEmail(): void {
    this.enviando = true;
    // Listar todos os clientes e procurar pelo email
    this.clienteService.listar().subscribe({
      next: (clientes) => {
        const clienteEncontrado = clientes.find(c => c.email === this.email);
        if (clienteEncontrado) {
          this.enviarEmail(clienteEncontrado.cpf);
        } else {
          this.mensagem = 'E-mail não encontrado no sistema.';
          this.tipoMensagem = 'erro';
          this.enviando = false;
        }
      },
      error: () => {
        this.mensagem = 'Erro ao buscar e-mail. Tente novamente.';
        this.tipoMensagem = 'erro';
        this.enviando = false;
      }
    });
  }

  private enviarEmail(cpf: number): void {
    this.clienteService.enviarEmailSenha(cpf).subscribe({
      next: () => {
        this.mensagem = 'Link de redefinição enviado! Verifique seu e-mail.';
        this.tipoMensagem = 'sucesso';
        this.cpf = 0;
        this.email = '';
        this.enviando = false;
      },
      error: () => {
        this.mensagem = 'Erro ao enviar o link. Tente novamente mais tarde.';
        this.tipoMensagem = 'erro';
        this.enviando = false;
      }
    });
  }
}
