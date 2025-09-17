package com.fatec.nexthome;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Cliente {
    @Id
    private long cpf;
    private String nome;
    private String email;
    private String senha;
    private String telefone;
    private String cidade;
    private String cep;
    private String endereco;
    private int status;
}
