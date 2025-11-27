package com.fatec.nexthome;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ImovelRepository extends
        JpaRepository<Imovel, Integer> {

    @Query("SELECT i FROM Imovel i WHERE i.destaque > 0 AND (i.status = :aluguel OR i.status = :venda) ORDER BY i.destaque ASC")
    public List<Imovel> listarVitrine(
            @Param("aluguel") String aluguel,
            @Param("venda") String venda
    );

    @Query("SELECT i FROM Imovel i WHERE i.estado LIKE %:termo% OR i.cidade LIKE %:termo% OR i.tipo LIKE %:termo% OR i.status LIKE %:termo%")
    public List<Imovel> fazerBusca(@Param("termo") String termo);

    @Query("SELECT i FROM Imovel i WHERE (i.estado LIKE %:termo% OR i.cidade LIKE %:termo% OR i.tipo LIKE %:termo% OR i.status LIKE %:termo%) AND i.status <> 'indisponivel'")
    public List<Imovel> fazerBuscaDisponivel(@Param("termo") String termo);

    @Query("SELECT i FROM Imovel i WHERE i.status = :aluguel OR i.status = :venda ORDER BY i.valor")
    public List<Imovel> listarDisponiveis(
            @Param("aluguel") String aluguel,
            @Param("venda") String venda
        );
}
