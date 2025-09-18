package com.fatec.nexthome;

import java.util.List;
import java.util.Optional;
import java.util.Random;

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
    TokenRepository bdToken;
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

    @PatchMapping("/nexthome/cliente/email/{cpf}")
    public void enviarTokenSenha(@PathVariable("cpf") long cpf) {
        Random gerador = new Random();
        int token = 1000 + gerador.nextInt(9000);
        Token t = new Token(token, cpf);
        bdToken.save(t);
        var cliente = bd.findById(cpf).get();
        var corpo = String.format(
            "Seu token: %d\nAcesse o link abaixo para redefinir a senha:\nhttp://localhost:8082/nexthome/cliente/senha"
        );
        String msg = service.enviarEmail(cliente.getEmail(), "Redefinição de senha", corpo);
        System.out.println(msg);
    }

    @PatchMapping("/nexthome/cliente/email/ativo/{cpf}")
    public void enviarTokenAtivo(@PathVariable("cpf") long cpf) {
        Random gerador = new Random();
        int token = 1000 + gerador.nextInt(9000);
        Token t = new Token(token, cpf);
        bdToken.save(t);
        var cliente = bd.findById(cpf).get();
        var corpo = String.format(
            "Seu token: %d\nAcesse o link abaixo para ativar sua conta:\nhttp://localhost:8082/nexthome/cliente/ativo/%d",
            token
        );
        String msg = service.enviarEmail(cliente.getEmail(), "Ativar conta", corpo);
        System.out.println(msg);
    }

    @PatchMapping("/nexthome/cliente/ativo/{token}")
    public Cliente ativarConta(@PathVariable long token){
        Optional<Token> retorno = bdToken.verificarToken(token);
        if(retorno.isPresent()){
            var obj = retorno.get();
            if(bd.existsById(obj.getCpf())){
                var cpf = obj.getCpf();
                Cliente cliente = bd.findById(cpf).get();
                cliente.setAtivo(1);
                bd.save(cliente);
                bdToken.deleteById(token);
                System.out.println("Conta ativada com sucesso!");
                return cliente;
            }
        }
        return new Cliente();
    }

    @PatchMapping("/nexthome/cliente/senha")
    public Cliente redefinirSenha(@RequestBody Token obj){
        Optional<Token> retorno = bdToken.verificarToken(obj.getToken());
        if(retorno.isPresent() && bd.existsById(obj.getCpf())){
            Cliente cliente = bd.findById(obj.getCpf()).get();
            cliente.setSenha(obj.getNovaSenha());
            bd.save(cliente);
            System.out.println("Senha alterada com sucesso!");
            bdToken.deleteById(obj.getToken());
            return cliente;
        }
        return new Cliente();
    }

}