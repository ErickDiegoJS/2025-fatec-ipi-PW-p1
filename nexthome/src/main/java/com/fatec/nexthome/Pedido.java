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
public class Pedido {
    @Id
    private long codigo;
    private long cpf;
    private String nome;
    private int codigo_imovel;
    private double valor;
}
