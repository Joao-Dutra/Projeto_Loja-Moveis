package com.sark.api.service;

import com.sark.api.model.VariacaoProduto;
import com.sark.api.repository.VariacaoProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VariacaoProdutoService {

    @Autowired
    private VariacaoProdutoRepository variacaoProdutoRepository;

    public VariacaoProduto salvarVariacaoProduto(VariacaoProduto variacaoProduto) {
        return variacaoProdutoRepository.save(variacaoProduto);
    }

    public List<VariacaoProduto> listarPorProduto(Long idProduto) {
        return variacaoProdutoRepository.findByProdutoId(idProduto);
    }
    
}
