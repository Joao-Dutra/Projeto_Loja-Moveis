package com.sark.api.controller;

import com.sark.api.model.VariacaoProduto;
import com.sark.api.service.VariacaoProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/variacoes-produto")
public class VariacaoProdutoController {

    @Autowired
    private VariacaoProdutoService variacaoProdutoService;

    @PostMapping
    public ResponseEntity<VariacaoProduto> salvarVariacaoProduto(@RequestBody VariacaoProduto variacaoProduto) {
        VariacaoProduto novaVariacao = variacaoProdutoService.salvarVariacaoProduto(variacaoProduto);
        return ResponseEntity.ok(novaVariacao);
    }

    @GetMapping
    public ResponseEntity<List<VariacaoProduto>> listarTodasVariacoes() {
        List<VariacaoProduto> variacoes = variacaoProdutoService.listarTodas();
        return ResponseEntity.ok(variacoes);
    }

    @GetMapping("/produto/{idProduto}")
    public ResponseEntity<List<VariacaoProduto>> listarVariacoesPorProduto(@PathVariable Long idProduto) {
        List<VariacaoProduto> variacoes = variacaoProdutoService.listarPorProduto(idProduto);
        return ResponseEntity.ok(variacoes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VariacaoProduto> buscarVariacaoPorId(@PathVariable Long id) {
        Optional<VariacaoProduto> variacaoProduto = variacaoProdutoService.buscarPorId(id);
        return variacaoProduto.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<VariacaoProduto> atualizarVariacaoProduto(
            @PathVariable Long id, @RequestBody VariacaoProduto variacaoAtualizada) {
        VariacaoProduto variacaoProduto = variacaoProdutoService.atualizarVariacaoProduto(id, variacaoAtualizada);
        return ResponseEntity.ok(variacaoProduto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVariacaoProduto(@PathVariable Long id) {
        variacaoProdutoService.deletarVariacaoProduto(id);
        return ResponseEntity.noContent().build();
    }
}
