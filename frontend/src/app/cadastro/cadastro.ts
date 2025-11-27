import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {

  cliente: Cliente = new Cliente();
  mensagemFinal: boolean = false;

  constructor(private clienteService: ClienteService) {}

  cadastrar() {
    // Validação
    if (!this.cliente.cpf || !this.cliente.nome || !this.cliente.email || !this.cliente.senha) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const cpfStr = this.cliente.cpf.toString().replace(/\D/g, ''); // Remove caracteres não numéricos
    
    if (cpfStr.length !== 11) {
      alert("CPF deve ter exatamente 11 dígitos!");
      return;
    }

    console.log("Enviando dados:", this.cliente);
    
    // Converter CPF para número
    const clienteEnvio = { ...this.cliente };
    clienteEnvio.cpf = parseInt(cpfStr) as any;
    clienteEnvio.ativo = 0;

    this.clienteService.gravar(clienteEnvio).subscribe({
      next: (response) => {
        console.log("Cadastro gravado com sucesso!", response);

        // Enviar o email de ativação
        this.clienteService.enviarEmailAtivo(parseInt(cpfStr)).subscribe({
          next: () => {
            console.log("Email enviado!");
            this.mensagemFinal = true;
          },
          error: (err) => {
            console.error("Erro ao enviar email:", err);
            alert("Cadastro realizado! Verifique seu email para ativar a conta.");
            this.mensagemFinal = true;
          }
        });
      },
      error: (err) => {
        console.error("Erro completo ao cadastrar:", err);
        console.error("Status:", err.status);
        console.error("Mensagem do erro:", err.error);
        alert("Erro ao cadastrar: " + (err.error?.message || err.message || "Tente novamente"));
      }
    });
  }
}
