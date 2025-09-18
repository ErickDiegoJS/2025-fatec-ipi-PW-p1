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
public class Token {
    @Id
    private long token;
    private long cpf;
    private String novaSenha;

    public Token(long token, long cpf) {
        this.token = token;
    }
}