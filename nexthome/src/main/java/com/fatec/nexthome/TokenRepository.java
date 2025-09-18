package com.fatec.nexthome;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    @Query(value="select * from token where and token=?1", nativeQuery = true)
    public Optional<Token> verificarToken(long token);
}