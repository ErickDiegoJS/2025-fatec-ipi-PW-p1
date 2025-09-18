package com.fatec.nexthome;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class PedidoController {
    @Autowired 
    PedidoRepository bd;
    @Autowired
    NextHomeService service;
    @Autowired 
    ClienteRepository bdCliente;
    
    @PatchMapping("/nexthome/pedido")
    public void gravar(@RequestBody Pedido obj){
        bd.save(obj);
        var cliente = bdCliente.findById(obj.getCpf()).get();
        var corpo = String.format(
            "Pedido feito com sucesso! Segue os detalhes do pedido:\nCodigo do pedido: %d\nCpf do cliente: %d\nNome do cliente: %s\nValor: %f",
            obj.getCodigo(), obj.getCpf(), obj.getNome(), obj.getValor()
        );
        
        String msg = service.enviarEmail(cliente.getEmail(), "Cofirmação de pedido", corpo);
        System.out.println(msg);
    }

    @PutMapping("/nexthome/pedido")
    public void alterar(@RequestBody Pedido obj){
        if(bd.existsById(obj.getCodigo())) bd.save(obj);
        System.out.println("Pedido alterado com sucesso!");
    }

    @DeleteMapping("/nexthome/pedido/{codigo}")
    public void apagar(@PathVariable("codigo") long codigo){
        bd.deleteById(codigo);
        System.out.println("cliente removido com sucesso!");
    }

    @GetMapping("/nexthome/pedido/{codigo}")
    public Pedido carregar(@PathVariable("codigo") long codigo){
        if(bd.existsById(codigo)){
            return bd.findById(codigo).get();
        } else {
            return new Pedido();
        }
    }

    @GetMapping("/nexthome/pedido/cliente/{cpf}")
    public List<Pedido> listar(@PathVariable("cpf") long cpf){
        return bd.listarPedidosCpf(cpf);
    }

    @GetMapping("/nexthome/pedidos")
    public List<Pedido> carregar(){
        return bd.findAll();
    }
}