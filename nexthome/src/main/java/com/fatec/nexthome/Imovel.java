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
public class Imovel {
    @Id
    private int codigo;
    private String cep;
    private String cidade;
    private String estado;
    private String endereço;
    private String tipo; // casa ou apartamento
    private double valor;
    private String status; // disponivel para aluguel, disponive para venda, vendida, alugada
}