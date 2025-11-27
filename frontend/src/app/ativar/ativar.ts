import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClienteService } from '../service/cliente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ativar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ativar.html',
  styleUrls: ['./ativar.css']
})
export class Ativar implements OnInit {

  mensagem: string = "Ativando conta...";
  ativado: boolean = false;
  erro: boolean = false;

  constructor(private route: ActivatedRoute, private clienteService: ClienteService) {}

  ngOnInit(): void {
    const cpf = Number(this.route.snapshot.paramMap.get("cpf"));

    if (!cpf || cpf === 0) {
      this.mensagem = "CPF inválido ❌";
      this.erro = true;
      return;
    }

    console.log("Ativando conta para CPF:", cpf);

    this.clienteService.ativarConta(cpf).subscribe({
      next: (response) => {
        console.log("Conta ativada com sucesso!", response);
        this.mensagem = "✅ Conta ativada com sucesso!";
        this.ativado = true;
      },
      error: (err) => {
        console.error("Erro ao ativar conta:", err);
        this.mensagem = "❌ Erro ao ativar conta. Tente novamente.";
        this.erro = true;
      }
    });
  }
}

