package com.fatec.nexthome;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>{
    @Query(value="select * from cliente where ativo=0", nativeQuery = true)
    public List<Cliente> listarInativos();
}