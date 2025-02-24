package com.sark.api.service;

import com.sark.api.model.VariacaoProduto;
import com.sark.api.repository.VariacaoProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VariacaoProdutoService {

    @Autowired
    private VariacaoProdutoRepository variacaoProdutoRepository;

    public VariacaoProduto salvarVariacaoProduto(VariacaoProduto variacaoProduto) {
        return variacaoProdutoRepository.save(variacaoProduto);
    }

    public List<VariacaoProduto> listarTodas() {
        return variacaoProdutoRepository.findAll();
    }

    public List<VariacaoProduto> listarPorProduto(Long idProduto) {
        return variacaoProdutoRepository.findByProdutoId(idProduto);
    }

    public Optional<VariacaoProduto> buscarPorId(Long id) {
        return variacaoProdutoRepository.findById(id);
    }

    public VariacaoProduto atualizarVariacaoProduto(Long id, VariacaoProduto variacaoAtualizada) {
        VariacaoProduto variacaoProduto = variacaoProdutoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Variação não encontrada!"));
        variacaoProduto.setCor(variacaoAtualizada.getCor());
        variacaoProduto.setTamanho(variacaoAtualizada.getTamanho());
        variacaoProduto.setMaterial(variacaoAtualizada.getMaterial());
        variacaoProduto.setPreco(variacaoAtualizada.getPreco());
        variacaoProduto.setEstoque(variacaoAtualizada.getEstoque());
        return variacaoProdutoRepository.save(variacaoProduto);
    }

    public void deletarVariacaoProduto(Long id) {
        VariacaoProduto variacaoProduto = variacaoProdutoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Variação não encontrada!"));
        variacaoProdutoRepository.delete(variacaoProduto);
    }
}
