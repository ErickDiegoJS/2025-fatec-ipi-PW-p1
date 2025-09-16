package com.fatec.nexthome;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/nexthome/cliente/{codigo}")
    public Cliente carregar(@PathVariable("cpf") int cpf){
        if(bd.existsById(cpf)){
            return bd.findById(cpf).get();
        } else {
            return new Cliente();
        }
    }

    @DeleteMapping("/nexthome/cliente/{codigo}")
    public void apagar(@PathVariable("cpf") int cpf){
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
}