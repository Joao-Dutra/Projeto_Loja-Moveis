package com.sark.api.service;

import com.sark.api.model.ImagemProduto;
import com.sark.api.repository.ImagemProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImagemProdutoService {

    @Autowired
    private ImagemProdutoRepository imagemProdutoRepository;

    public ImagemProduto salvarImagemProduto(ImagemProduto imagemProduto) {
        return imagemProdutoRepository.save(imagemProduto);
    }

    public List<ImagemProduto> listarTodas() {
        return imagemProdutoRepository.findAll();
    }

    public List<ImagemProduto> listarPorProduto(Long idProduto) {
        return imagemProdutoRepository.findByProdutoId(idProduto);
    }

    public Optional<ImagemProduto> buscarPorId(Long id) {
        return imagemProdutoRepository.findById(id);
    }

    public void deletarImagemProduto(Long id) {
        ImagemProduto imagemProduto = imagemProdutoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Imagem não encontrada!"));
        imagemProdutoRepository.delete(imagemProduto);
    }
}
