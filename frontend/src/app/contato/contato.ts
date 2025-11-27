import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../service/cliente';
import { Email } from '../model/email';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contato',
  imports: [CommonModule, FormsModule],
  templateUrl: './contato.html',
  styleUrls: ['./contato.css'],
})
export class Contato {

  mensagem: Email = new Email();

  constructor(private clienteService: ClienteService) {}

  enviar() {
    if (!this.mensagem.nome || !this.mensagem.emailRemetente || !this.mensagem.texto) {
      alert("Preencha todos os campos antes de enviar!");
      return;
    }

    this.clienteService.enviarMensagem(this.mensagem).subscribe({
      next: () => {
        alert("Mensagem enviada com sucesso!");
        this.mensagem = new Email(); // limpa o formulário
      },
      error: () => {
        alert("Erro ao enviar a mensagem. Tente novamente.");
      }
    });
  }
}
