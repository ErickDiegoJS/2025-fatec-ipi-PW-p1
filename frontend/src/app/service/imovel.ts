import { Injectable } from '@angular/core';
import { Imovel } from '../model/imovel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImovelService {

  private baseUrl = "http://localhost:8083/nexthome/imovel";

  constructor(private http: HttpClient) { }

  // Criar novo imóvel
  gravar(imovel: Imovel): Observable<any> {
    return this.http.post(`${this.baseUrl}`, imovel);
  }

  // Buscar imóvel pelo código
  exibir(codigo: number): Observable<Imovel> {
    return this.http.get<Imovel>(`${this.baseUrl}/${codigo}`);
  }

  // Alias para exibir - para manter consistência com outros serviços
  carregar(codigo: number): Observable<Imovel> {
    return this.exibir(codigo);
  }

  // Alterar imóvel
  alterar(imovel: Imovel): Observable<any> {
    return this.http.put(`${this.baseUrl}`, imovel);
  }

  // Remover imóvel
  remover(codigo: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${codigo}`);
  }

  // Listar todos os imóveis
  listar(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(`http://localhost:8083/nexthome/imoveis`);
  }

  // Listar apenas imóveis disponíveis
  listarDisponiveis(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(`http://localhost:8083/nexthome/imoveis/disponiveis`);
  }

  // Mostrar vitrine
  mostrarVitrine(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(`http://localhost:8083/nexthome/produtos/vitrine`);
  }

  // Buscar imóveis por termo
  buscarProdutos(termo: string): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(`http://localhost:8083/nexthome/produtos/busca?termo=${encodeURIComponent(termo)}`);
  }

  // Buscar imóveis disponíveis por termo
  buscarProdutosDisponivel(termo: string): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(`http://localhost:8083/nexthome/produtos/disponivel/busca?termo=${encodeURIComponent(termo)}`);
  }
}
