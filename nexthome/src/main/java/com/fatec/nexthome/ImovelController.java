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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class ImovelController {
    @Autowired
    ImovelRepository bd;

    @PostMapping("/nexthome/imovel")
    public void gravar(@RequestBody Imovel imovel){
        bd.save(imovel);
        System.out.println("Imovel gravado!");
    }

    @GetMapping("/nexthome/imovel/{codigo}")
    public Imovel exibir(@PathVariable("codigo") int cod){
        return bd.existsById(cod) ? bd.findById(cod).get() : new Imovel();
    }

    @PutMapping("/nexthome/imovel")
    public void alterar(@RequestBody Imovel imovel){
        if(bd.existsById(imovel.getCodigo())){
            bd.save(imovel);
            System.out.println("Alteração bem sucedida!");
        }
    }

    @DeleteMapping("/nexthome/imovel/{codigo}")
    public void remover(@PathVariable("codigo") int cod){
        if(bd.existsById(cod)){
            bd.deleteById(cod);
            System.out.println("Imovel removido!");
        }
    }

    @GetMapping("/nexthome/imoveis")
    public List<Imovel> listar(){
        return bd.findAll();
    }

    @GetMapping("/api/produtos/vitrine")
    public List<Imovel> mostrarVitrine() {
        return bd.listarVitrine();
    }

    @GetMapping("/api/produtos/busca")      
    public List<Imovel> buscarProdutos(@RequestParam String termo) {
        return bd.fazerBusca(termo);
    }
}
