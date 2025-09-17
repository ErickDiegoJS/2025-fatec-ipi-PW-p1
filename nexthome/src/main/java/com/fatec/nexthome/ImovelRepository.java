package com.fatec.nexthome;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ImovelRepository extends 
JpaRepository<Imovel, Integer>{

    
    @Query("SELECT i FROM Imovel i WHERE i.destaque > 0 ORDER BY i.destaque ASC")
    public List<Imovel> listarVitrine();

    
    @Query("SELECT i FROM Imovel i WHERE i.estado LIKE %:termo% OR WHERE i.cidade LIKE %:termo% OR i.tipo LIKE %:termo% OR i.status LIKE %:termo%")
    public List<Imovel> fazerBusca(@Param("termo") String termo);

}
