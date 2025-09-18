package com.fatec.nexthome;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class ClienteController {
    @Autowired 
    ClienteRepository bd;
    @Autowired
    NextHomeService service;

    @PostMapping("/nexthome/cliente")
    public void gravar(@RequestBody Cliente obj){
        bd.save(obj);
        System.out.println("Cliente cadastrado com sucesso!");
    }

    @PutMapping("/nexthome/cliente")
    public void alterar(@RequestBody Cliente obj){
        if(bd.existsById(obj.getCpf())) bd.save(obj);
        System.out.println("Cliente alterado com sucesso!");
    }

    @GetMapping("/nexthome/cliente/{cpf}")
    public Cliente carregar(@PathVariable("cpf") long cpf){
        if(bd.existsById(cpf)){
            return bd.findById(cpf).get();
        } else {
            return new Cliente();
        }
    }

    @DeleteMapping("/nexthome/cliente/{cpf}")
    public void apagar(@PathVariable("cpf") long cpf){
        bd.deleteById(cpf);
        System.out.println("cliente removido com sucesso!");
    }

    @GetMapping("/nexthome/clientes")
    public List<Cliente> listar(){
        return bd.findAll();
    }

    @GetMapping("/nexthome/cliente/inativos")
    public List<Cliente> carregarInativos(){
        return bd.listarInativos();
    }

    @PostMapping("/nexthome/cliente/login")
    public Cliente fazerLogin(@RequestBody Cliente obj){
        Optional<Cliente> retorno = bd.fazerLogin(obj.getEmail(), obj.getSenha());
        if(retorno.isPresent()){
            return retorno.get();
        } else {
            return new Cliente();
        }
    }

    @PatchMapping("/nexthome/cliente/email/senha/{cpf}")
    public void enviarEmailSenha(@PathVariable("cpf") long cpf) {
        var cliente = bd.findById(cpf).get();
        var corpo = String.format(
            "Acesse o link abaixo para redefinir a senha:\nhttp://localhost:8082/nexthome/cliente/senha/%d",
            cpf
        );
        String msg = service.enviarEmail(cliente.getEmail(), "Redefinição de senha", corpo);
        System.out.println(msg);
    }
    
    @PatchMapping("/nexthome/cliente/email/ativo/{cpf}")
    public void enviarEmailAtivo(@PathVariable("cpf") long cpf) {
        var cliente = bd.findById(cpf).get();
        var corpo = String.format(
            "Acesse o link abaixo para ativar sua conta:\nhttp://localhost:8082/nexthome/cliente/ativo/%d",
            cpf
        );
        String msg = service.enviarEmail(cliente.getEmail(), "Ativar conta", corpo);
        System.out.println(msg);
    }

    @PatchMapping("/nexthome/cliente/ativo/{cpf}")
    public Cliente ativarConta(@PathVariable("cpf") long cpf){
        Optional<Cliente> retorno = bd.findById(cpf);
        if(retorno.isPresent()){
            var cliente = retorno.get();
            if(cliente.getAtivo() == 1){return retorno.get();}
            cliente.setAtivo(1);
            bd.save(cliente);
            String msg = service.enviarEmail(cliente.getEmail(), "Conta ativada", "Olá, tudo bem?\nSua conta foi ativada com sucesso, você já pode voltar a utilizar nosso site.\nBoas compras!");
            System.out.println(msg);
            return cliente;
        }
        return new Cliente();
    }

    @PatchMapping("/nexthome/cliente/senha/{cpf}")
    public Cliente redefinirSenha(@RequestBody Cliente obj, @PathVariable("cpf") long cpf){
        Optional<Cliente> retorno = bd.findById(obj.getCpf());
        if(retorno.isPresent()){
            Cliente cliente = bd.findById(obj.getCpf()).get();
            cliente.setSenha(obj.getSenha());
            bd.save(cliente);
            String msg = service.enviarEmail(cliente.getEmail(), "Redefinição de senha", "Sua senha foi redefinida com sucesso!\nVolte a pagina de login e tente novamente com a nova senha.");
            System.out.println(msg);
            return cliente;
        }
        return new Cliente();
    }

}