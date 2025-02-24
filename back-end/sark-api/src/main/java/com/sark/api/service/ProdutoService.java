package com.sark.api.service;

import com.sark.api.model.Produto;
import com.sark.api.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Transactional
    public List<Produto> listarProdutos() {
        List<Produto> produtos = produtoRepository.findAll();
        produtos.forEach(produto -> {
            produto.getVariacoes().size(); // Inicializa a coleção
            produto.getImagens().size();   // Inicializa a coleção
        });
        return produtos;
    }

    public Optional<Produto> buscarProdutoPorId(Long id) {
        return produtoRepository.findById(id);
    }

    public Produto salvarProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Produto atualizarProduto(Long id, Produto produtoAtualizado) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado!"));
        produto.setNome(produtoAtualizado.getNome());
        produto.setDescricao(produtoAtualizado.getDescricao());
        produto.setCategoria(produtoAtualizado.getCategoria());
        produto.setVariacoes(produtoAtualizado.getVariacoes());
        produto.setImagens(produtoAtualizado.getImagens());
        return produtoRepository.save(produto);
    }

    public void deletarProduto(Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado!"));
        produtoRepository.delete(produto);
    }
}
