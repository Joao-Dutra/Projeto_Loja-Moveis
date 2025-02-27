package com.sark.api.service;

import com.sark.api.model.Produto;
import com.sark.api.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
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
            produto.getImagens().size(); // Inicializa a coleção
        });
        return produtos;
    }

    public Optional<Produto> buscarProdutoPorId(Long id) {
        return produtoRepository.findById(id);
    }

    public Produto salvarProduto(Produto produto) {
        // Garante que ao criar um novo produto o ID seja nulo para que o banco de dados
        // gere um novo
        if (produto.getId() != null && produto.getId() == 0) {
            produto.setId(null);
        }
        return produtoRepository.save(produto);
    }

    @Transactional
    public Produto atualizarProduto(Long id, Produto produtoAtualizado) {
        Produto produtoExistente = produtoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));

        produtoExistente.setNome(produtoAtualizado.getNome());
        produtoExistente.setDescricao(produtoAtualizado.getDescricao());
        produtoExistente.setCategoria(produtoAtualizado.getCategoria());

        // Atualiza as variações mantendo as existentes
        produtoExistente.getVariacoes().clear();
        produtoAtualizado.getVariacoes().forEach(variacao -> {
            variacao.setProduto(produtoExistente); // Assegura a referência bidirecional
            produtoExistente.getVariacoes().add(variacao);
        });

        // Atualiza as imagens
        produtoExistente.getImagens().clear();
        produtoAtualizado.getImagens().forEach(imagem -> {
            imagem.setProduto(produtoExistente); // Assegura a referência bidirecional
            produtoExistente.getImagens().add(imagem);
        });

        return produtoRepository.save(produtoExistente);
    }

    public void deletarProduto(Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado!"));
        produtoRepository.delete(produto);
    }
}
