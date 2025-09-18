package com.fatec.nexthome;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository extends 
JpaRepository<Pedido, Long>{
    @Query("SELECT p FROM Pedido p WHERE p.cpf = :cpf")
    public List<Pedido> listarPedidosCpf(@Param("cpf") long cpf);
}