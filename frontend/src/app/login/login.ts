import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../service/cliente';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email: string = "";
  senha: string = "";

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  login() {
    this.clienteService.login(this.email, this.senha).subscribe({
      next: (res: any) => {
        localStorage.setItem("clienteLogado", JSON.stringify(res));
        this.router.navigate(["/home"]);
      },
      error: () => {
        alert("Email ou senha incorretos!");
      }
    });
  }
}
