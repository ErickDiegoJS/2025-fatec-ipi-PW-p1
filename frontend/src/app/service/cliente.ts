import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Email } from '../model/email';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = "http://localhost:8083/nexthome/cliente";

  constructor(private http: HttpClient) { }

  gravar(obj: Cliente): Observable<any> {
    return this.http.post(`${this.baseUrl}`, obj);
  }

  alterar(obj: Cliente): Observable<any> {
    return this.http.put(`${this.baseUrl}`, obj);
  }

  carregar(cpf: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${cpf}`);
  }

  remover(cpf: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${cpf}`);
  }

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}s`);
  }

  carregarInativos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/inativos`);
  }

  login(email: string, senha: string) {
    return this.http.post("http://localhost:8083/nexthome/cliente/login", {
      email: email,
      senha: senha
    });
  }

  enviarEmailSenha(cpf: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/email/senha/${cpf}`, {});
  }

  enviarEmailAtivo(cpf: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/email/ativo/${cpf}`, {});
  }

  ativarConta(cpf: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/ativo/${cpf}`);
  }

  redefinirSenha(obj: Cliente, cpf: number): Observable<Cliente> {
    return this.http.patch<Cliente>(`${this.baseUrl}/senha/${cpf}`, obj);
  }

  enviarMensagem(mensagem: Email): Observable<any> {
    return this.http.patch(`http://localhost:8083/nexthome/email`, mensagem, { responseType: 'text' });
  }

  isLogin(): boolean {
    const cliente = localStorage.getItem('clienteLogado');
    return cliente !== null && cliente !== '';
  }
}
