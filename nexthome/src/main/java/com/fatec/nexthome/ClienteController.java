package com.fatec.nexthome;

import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public Cliente gravar(@RequestBody Cliente obj) {
        try {
            System.out.println("Recebendo cliente: " + obj.getCpf() + " - " + obj.getNome() + " - " + obj.getEmail());
            bd.save(obj);
            System.out.println("Cliente cadastrado com sucesso!");
            return obj;
        } catch (Exception e) {
            System.err.println("Erro ao cadastrar cliente: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @PutMapping("/nexthome/cliente")
    public void alterar(@RequestBody Cliente obj) {
        if (bd.existsById(obj.getCpf()))
            bd.save(obj);
        System.out.println("Cliente alterado com sucesso!");
    }

    @GetMapping("/nexthome/cliente/{cpf}")
    public Cliente carregar(@PathVariable("cpf") long cpf) {
        if (bd.existsById(cpf)) {
            return bd.findById(cpf).get();
        } else {
            return new Cliente();
        }
    }

    @DeleteMapping("/nexthome/cliente/{cpf}")
    public void apagar(@PathVariable("cpf") long cpf) {
        bd.deleteById(cpf);
        System.out.println("cliente removido com sucesso!");
    }

    @GetMapping("/nexthome/clientes")
    public List<Cliente> listar() {
        return bd.findAll();
    }

    @GetMapping("/nexthome/cliente/inativos")
    public List<Cliente> carregarInativos() {
        return bd.listarInativos();
    }

    @PostMapping("/nexthome/cliente/login")
    public ResponseEntity<?> fazerLogin(@RequestBody Cliente obj) {
        Optional<Cliente> c = bd.fazerLogin(obj.getEmail(), obj.getSenha());
        if (c.isPresent()) {
            return ResponseEntity.ok(
                    Map.of(
                            "id", c.get().getCpf(),
                            "nome", c.get().getNome(),
                            "email", c.get().getEmail()));
        }
        return ResponseEntity.status(401).body("Login inválido");
    }

    @PatchMapping("/nexthome/cliente/email/senha/{cpf}")
    public void enviarEmailSenha(@PathVariable("cpf") long cpf) {
        var cliente = bd.findById(cpf).get();
        var corpo = String.format(
                "Acesse o link abaixo para redefinir a senha:\nhttp://localhost:4200/redefinir-senha/%d",
                cpf);
        String msg = service.enviarEmail(cliente.getEmail(), "Redefinição de senha", corpo);
        System.out.println(msg);
    }

    @PatchMapping("/nexthome/cliente/email/ativo/{cpf}")
    public void enviarEmailAtivo(@PathVariable("cpf") long cpf) {
        var cliente = bd.findById(cpf).get();
        var corpo = String.format(
                "Acesse o link abaixo para ativar sua conta:\nhttp://localhost:4200/ativar/%d",
                cpf);
        String msg = service.enviarEmail(cliente.getEmail(), "Ativar conta", corpo);
        System.out.println(msg);
    }

    @GetMapping("/nexthome/cliente/ativo/{cpf}")
    public Cliente ativarConta(@PathVariable("cpf") long cpf) {
        Optional<Cliente> retorno = bd.findById(cpf);
        if (retorno.isPresent()) {
            var cliente = retorno.get();
            if (cliente.getAtivo() == 1) {
                return retorno.get();
            }
            cliente.setAtivo(1);
            bd.save(cliente);
            String msg = service.enviarEmail(cliente.getEmail(), "Conta ativada",
                    "Olá, tudo bem?\nSua conta foi ativada com sucesso, você já pode voltar a utilizar nosso site.\nBoas compras!");
            System.out.println(msg);
            return cliente;
        }
        return new Cliente();
    }

    @PatchMapping("/nexthome/cliente/senha/{cpf}")
    public Cliente redefinirSenha(@RequestBody Cliente obj, @PathVariable("cpf") long cpf) {
        Optional<Cliente> retorno = bd.findById(obj.getCpf());
        if (retorno.isPresent()) {
            Cliente cliente = bd.findById(obj.getCpf()).get();
            cliente.setSenha(obj.getSenha());
            bd.save(cliente);
            String msg = service.enviarEmail(cliente.getEmail(), "Redefinição de senha",
                    "Sua senha foi redefinida com sucesso!\nVolte a pagina de login e tente novamente com a nova senha.");
            System.out.println(msg);
            return cliente;
        }
        return new Cliente();
    }

    @GetMapping("/nexthome/cliente/senha/{cpf}")
    public String acessarPaginaSenha(@PathVariable("cpf") long cpf) {
        // Apenas redireciona para a página de redefinição de senha
        return "redirect:/senha?cpf=" + cpf;
    }

    @PatchMapping("/nexthome/email")
    public String enviarEmailFixo(@RequestBody EmailRequest request) {
        // Título do email com o nome do remetente
        String titulo = "Mensagem de " + request.getNome();
        // Corpo do email com email do remetente e a mensagem
        String corpo = String.format(
                "Email do remetente: %s\n\nMensagem:\n%s",
                request.getEmailRemetente(),
                request.getTexto());

        // Envia o email para o destinatário fixo
        String msg = service.enviarEmail("diegoerick965@gmail.com", titulo, corpo);
        System.out.println(msg);
        return "Email enviado com sucesso!";
    }

}