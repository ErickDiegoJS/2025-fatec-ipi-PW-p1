import { Injectable } from '@angular/core';
import { Pedido } from '../model/pedido';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseUrl = 'http://localhost:8083/nexthome/pedido';

  constructor(private http: HttpClient) {}

  gravar(obj: Pedido): Observable<any> {
    return this.http.patch(`${this.baseUrl}`, obj);
  }

  alterar(obj: Pedido): Observable<any> {
    return this.http.put(`${this.baseUrl}`, obj);
  }

  apagar(codigo: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${codigo}`);
  }

  carregar(codigo: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/${codigo}`);
  }

  listarPorCpf(cpf: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/cliente/${cpf}`);
  }

  listarTodos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}s`);
  }
}
