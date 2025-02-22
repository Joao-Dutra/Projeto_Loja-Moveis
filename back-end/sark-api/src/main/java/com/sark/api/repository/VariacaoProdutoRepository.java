package com.sark.api.repository;

import com.sark.api.model.VariacaoProduto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VariacaoProdutoRepository extends JpaRepository<VariacaoProduto, Long> {
    List<VariacaoProduto> findByProdutoId(Long idProduto);
}
