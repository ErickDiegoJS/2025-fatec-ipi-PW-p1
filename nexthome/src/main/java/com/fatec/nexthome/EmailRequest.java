package com.fatec.nexthome;

public class EmailRequest {
    private String nome;
    private String emailRemetente;
    private String texto;

    // Construtor vazio necessário para o Spring mapear o JSON
    public EmailRequest() {}

    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmailRemetente() {
        return emailRemetente;
    }

    public void setEmailRemetente(String emailRemetente) {
        this.emailRemetente = emailRemetente;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }
}
