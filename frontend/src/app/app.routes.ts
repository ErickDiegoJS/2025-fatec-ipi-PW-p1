import { Routes } from '@angular/router';
import { Cadastro } from './cadastro/cadastro';
import { Vitrine } from './vitrine/vitrine';
import { Cliente } from './cliente/cliente';
import { Contato } from './contato/contato';
import { ImovelComponent } from './imovel/imovel';
import { Compra } from './compra/compra';
import { Login } from './login/login';
import { Senha } from './senha/senha';
import { Sobre } from './sobre/sobre';
import { Home } from './home/home';
import { Ativar } from './ativar/ativar';
import { Pedidos } from './pedidos/pedidos';
import { MeusPedidos } from './meus-pedidos/meus-pedidos';
import { Editar } from './editar/editar';
import { RedefinirSenha } from './redefinir-senha/redefinir-senha';
import { AuthGuard } from './auth.guard';
import { Admin } from './admin/admin';
import { AdminGuard } from './admin.guard';
import { AdminAcessoNegado } from './admin-acesso-negado/admin-acesso-negado';
import { AdminEditarImovel } from './admin/admin-editar-imovel/admin-editar-imovel';
import { AdminAdicionarImovel } from './admin/admin-adicionar-imovel/admin-adicionar-imovel';
import { AdminRemoverImovel } from './admin/admin-remover-imovel/admin-remover-imovel';
import { AdminEditarPedido } from './admin/admin-editar-pedido/admin-editar-pedido';
import { AdminRemoverPedido } from './admin/admin-remover-pedido/admin-remover-pedido';
import { AdminRemoverCliente } from './admin/admin-remover-cliente/admin-remover-cliente';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'cadastro', component: Cadastro },
    { path: 'vitrine', component: Vitrine },
    { path: 'cliente', component: Cliente, canActivate: [AuthGuard] },
    { path: 'contato', component: Contato },
    { path: 'imovel/:codigo', component: ImovelComponent },
    { path: 'ativar/:cpf', component: Ativar },
    { path: 'editar', component: Editar },
    { path: 'compra', component: Compra, canActivate: [AuthGuard] },
    { path: 'pedidos/:codigo', component: Pedidos, canActivate: [AuthGuard] },
    { path: 'meus-pedidos', component: MeusPedidos, canActivate: [AuthGuard] },
    { path: 'login', component: Login },
    { path: 'senha', component: Senha },
    { path: 'redefinir-senha/:cpf', component: RedefinirSenha },
    { path: 'sobre', component: Sobre },
    { path: 'home', component: Home},
    { path: 'admin', component: Admin, canActivate: [AdminGuard] },
    { path: 'admin/editar-imovel', component: AdminEditarImovel, canActivate: [AdminGuard] },
    { path: 'admin/adicionar-imovel', component: AdminAdicionarImovel, canActivate: [AdminGuard] },
    { path: 'admin/remover-imovel', component: AdminRemoverImovel, canActivate: [AdminGuard] },
    { path: 'admin/editar-pedido', component: AdminEditarPedido, canActivate: [AdminGuard] },
    { path: 'admin/remover-pedido', component: AdminRemoverPedido, canActivate: [AdminGuard] },
    { path: 'admin/remover-cliente', component: AdminRemoverCliente, canActivate: [AdminGuard] },
    { path: 'admin/acesso-negado', component: AdminAcessoNegado },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
