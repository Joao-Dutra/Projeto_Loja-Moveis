package com.sark.api.controller;

import com.sark.api.model.VariacaoProduto;
import com.sark.api.service.VariacaoProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/variacoes-produto")
public class VariacaoProdutoController {

    @Autowired
    private VariacaoProdutoService variacaoProdutoService;

    @PostMapping
    public VariacaoProduto salvarVariacaoProduto(@RequestBody VariacaoProduto variacaoProduto) {
        return variacaoProdutoService.salvarVariacaoProduto(variacaoProduto);
    }

    @GetMapping("/produto/{idProduto}")
    public ResponseEntity<List<VariacaoProduto>> listarVariacoesPorProduto(@PathVariable Long idProduto) {
        List<VariacaoProduto> variacoes = variacaoProdutoService.listarPorProduto(idProduto);
        return ResponseEntity.ok(variacoes);
    }
}
