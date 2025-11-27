import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImovelService } from '../../service/imovel';
import { Imovel } from '../../model/imovel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-editar-imovel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-editar-imovel.html',
  styleUrl: './admin-editar-imovel.css',
})
export class AdminEditarImovel implements OnInit {
  imovel: Imovel | null = null;
  codigo: number = 0;
  mensagem: string = '';
  tipoMensagem: string = '';
  carregando: boolean = false;
  salvando: boolean = false;

  constructor(private imovelService: ImovelService) {}

  ngOnInit(): void {}

  buscarImovel(): void {
    if (!this.codigo) {
      this.mensagem = 'Por favor, insira um código válido.';
      this.tipoMensagem = 'erro';
      return;
    }

    this.carregando = true;
    this.imovelService.carregar(this.codigo).subscribe({
      next: (data) => {
        this.imovel = data;
        this.carregando = false;
        this.mensagem = '';
      },
      error: () => {
        this.mensagem = 'Erro ao carregar imóvel.';
        this.tipoMensagem = 'erro';
        this.carregando = false;
      }
    });
  }

  salvarAlteracoes(): void {
    if (!this.imovel) {
      this.mensagem = 'Nenhum imóvel carregado.';
      this.tipoMensagem = 'erro';
      return;
    }

    this.salvando = true;
    this.imovelService.alterar(this.imovel).subscribe({
      next: () => {
        this.mensagem = 'Imóvel alterado com sucesso!';
        this.tipoMensagem = 'sucesso';
        this.salvando = false;
      },
      error: () => {
        this.mensagem = 'Erro ao salvar alterações.';
        this.tipoMensagem = 'erro';
        this.salvando = false;
      }
    });
  }
}
