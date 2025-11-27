import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar implements OnInit {

  cliente: Cliente = new Cliente();        // dados carregados do BD
  clienteOriginal: Cliente = new Cliente(); // cópia para comparação
  cpf: number = 0;
  mensagemFinal: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obterCpfLocalStorage();
    this.carregar();
  }

  obterCpfLocalStorage(): void {
    const clienteLogado = localStorage.getItem('clienteLogado');
    if (clienteLogado) {
      const cliente = JSON.parse(clienteLogado);
      this.cpf = cliente.id;   // seu localStorage guarda como "id"
    }
  }

  carregar(): void {
    this.clienteService.carregar(this.cpf).subscribe({
      next: (dados) => {
        this.cliente = dados;
        this.clienteOriginal = { ...dados }; // salva copia para comparação
      },
      error: () => {}
    })
  }

  alterar(): void {

    // Mantém valores antigos se o usuário não preencheu
    const clienteAtualizado = {
      cpf: this.cpf,
      nome: this.cliente.nome || this.clienteOriginal.nome,
      email: this.cliente.email || this.clienteOriginal.email,
      telefone: this.cliente.telefone || this.clienteOriginal.telefone,
      cidade: this.cliente.cidade || this.clienteOriginal.cidade,
      cep: this.cliente.cep || this.clienteOriginal.cep,
      endereco: this.cliente.endereco || this.clienteOriginal.endereco,
      senha: this.cliente.senha || this.clienteOriginal.senha,
      ativo: 1,
      papel: this.clienteOriginal.papel
    };

    this.clienteService.alterar(clienteAtualizado).subscribe({
      next: () => {

        // atualiza localStorage
        const clienteLogado = JSON.parse(localStorage.getItem('clienteLogado') || '{}');
        clienteLogado.nome = clienteAtualizado.nome;
        clienteLogado.email = clienteAtualizado.email;
        clienteLogado.id = clienteAtualizado.cpf;

        localStorage.setItem('clienteLogado', JSON.stringify(clienteLogado));

        this.mensagemFinal = true;
      },
      error: () => alert("Erro ao atualizar os dados")
    });
  }

}
