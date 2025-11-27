import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../service/cliente';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-redefinir-senha',
  imports: [FormsModule, CommonModule],
  templateUrl: './redefinir-senha.html',
  styleUrl: './redefinir-senha.css',
})
export class RedefinirSenha implements OnInit {
  cpf: number = 0;
  novaSenha: string = '';
  confirmarSenha: string = '';
  mensagem: string = '';
  tipoMensagem: string = ''; // 'sucesso' ou 'erro'
  enviando: boolean = false;
  senhaRedefinida: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    // Obter CPF da URL
    this.route.params.subscribe((params) => {
      if (params['cpf']) {
        this.cpf = Number(params['cpf']);
      } else {
        this.mensagem = 'CPF não fornecido. Redirecionando...';
        this.tipoMensagem = 'erro';
        setTimeout(() => this.router.navigate(['/senha']), 2000);
      }
    });
  }

  redefinirSenha(): void {
    // Validações
    if (!this.novaSenha || !this.confirmarSenha) {
      this.mensagem = 'Preencha todos os campos.';
      this.tipoMensagem = 'erro';
      return;
    }

    if (this.novaSenha.length < 6) {
      this.mensagem = 'A senha deve ter no mínimo 6 caracteres.';
      this.tipoMensagem = 'erro';
      return;
    }

    if (this.novaSenha !== this.confirmarSenha) {
      this.mensagem = 'As senhas não conferem.';
      this.tipoMensagem = 'erro';
      return;
    }

    this.enviando = true;

    // Criar objeto cliente com a nova senha
    const cliente = new Cliente();
    cliente.cpf = this.cpf;
    cliente.senha = this.novaSenha;

    // Chamar serviço para redefinir senha
    this.clienteService.redefinirSenha(cliente, this.cpf).subscribe({
      next: () => {
        this.mensagem = 'Senha redefinida com sucesso! Redirecionando para login...';
        this.tipoMensagem = 'sucesso';
        this.senhaRedefinida = true;
        this.enviando = false;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: () => {
        this.mensagem = 'Erro ao redefinir a senha. Tente novamente.';
        this.tipoMensagem = 'erro';
        this.enviando = false;
      }
    });
  }
}
