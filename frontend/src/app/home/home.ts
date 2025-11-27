import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImovelService } from '../service/imovel';
import { Imovel } from '../model/imovel';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {

  imoveis: Imovel[] = [];

  constructor(private imovelService: ImovelService, private router: Router) { }

  ngOnInit(): void {
    this.carregarVitrine();
  }

  carregarVitrine(): void {
    this.imovelService.mostrarVitrine().subscribe(
      (data: Imovel[]) => {
        this.imoveis = data;
      },
      () => {
      }
    );
  }

  pesquisar(termo: string) {
    if (!termo || termo.trim() === '') {
      alert('Por favor, digite um termo de busca!');
      return;
    }
    this.router.navigate(['/vitrine'], {
      queryParams: { q: termo.trim() }
    });
  }

}
