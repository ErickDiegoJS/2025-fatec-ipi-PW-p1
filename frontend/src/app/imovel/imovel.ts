import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ImovelService } from '../service/imovel';
import { Imovel } from '../model/imovel';

@Component({
  selector: 'app-imovel',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './imovel.html',
  styleUrl: './imovel.css',
})
export class ImovelComponent implements OnInit {

  imovel: Imovel | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imovelService: ImovelService
  ) {}

  ngOnInit(): void {
    const codigo = Number(this.route.snapshot.paramMap.get('codigo'));

    if (!codigo) {
      return;
    }

    this.imovelService.exibir(codigo).subscribe({
      next: (data: Imovel) => {
        this.imovel = data;
      },
      error: () => {
      }
    });
  }

  comprarOuAlugar(): void {
    if (this.imovel) {
      this.router.navigate(['/pedidos', this.imovel.codigo]);
    }
  }
}
