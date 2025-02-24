package com.sark.api.controller;

import com.sark.api.model.ImagemProduto;
import com.sark.api.service.ImagemProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/imagens-produto")
public class ImagemProdutoController {

    @Autowired
    private ImagemProdutoService imagemProdutoService;

    @GetMapping("/produto/{idProduto}")
    public ResponseEntity<List<ImagemProduto>> listarImagensPorProduto(@PathVariable Long idProduto) {
        List<ImagemProduto> imagens = imagemProdutoService.listarPorProduto(idProduto);
        return ResponseEntity.ok(imagens);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImagemProduto> buscarImagemPorId(@PathVariable Long id) {
        Optional<ImagemProduto> imagemProduto = imagemProdutoService.buscarPorId(id);
        return imagemProduto.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ImagemProduto> salvarImagemProduto(@RequestBody ImagemProduto imagemProduto) {
        ImagemProduto novaImagem = imagemProdutoService.salvarImagemProduto(imagemProduto);
        return ResponseEntity.ok(novaImagem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarImagemProduto(@PathVariable Long id) {
        imagemProdutoService.deletarImagemProduto(id);
        return ResponseEntity.noContent().build();
    }
}
