package com.sark.api.repository;

import com.sark.api.model.Produto;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    @Query("SELECT p FROM Produto p JOIN FETCH p.variacoes v JOIN FETCH p.imagens i")
    List<Produto> findAllWithVariacoesAndImagens();

}
