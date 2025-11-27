import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ImovelService } from '../service/imovel';
import { Imovel } from '../model/imovel';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vitrine',
  imports: [CommonModule, DecimalPipe, RouterLink],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine implements OnInit {
  imoveis: Imovel[] = [];

  constructor(private imovelService: ImovelService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const termo = params['q'];

      if (termo && termo.trim() !== '') {
        this.onBuscar(termo);
      } else {
        this.carregarImoveis();
      }
    });
  }

  carregarImoveis(): void {
    this.imovelService.listarDisponiveis().subscribe({
      next: (data: Imovel[]) => {
        this.imoveis = data;
      },
      error: () => {
        this.imoveis = [];
      }
    });
  }

  onBuscar(termo: string): void {
    if (!termo || termo.trim() === '') {
      this.carregarImoveis();
      return;
    }

    const termoLimpo = termo.trim();

    this.imovelService.buscarProdutosDisponivel(termoLimpo).subscribe({
      next: (resultado: Imovel[]) => {
        this.imoveis = resultado;
      },
      error: () => {
        this.imoveis = [];
      }
    });
  }
}
