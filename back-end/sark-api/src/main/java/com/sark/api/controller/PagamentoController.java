package com.sark.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sark.api.strategy.PagamentoBoleto;
import com.sark.api.strategy.PagamentoCartao;
import com.sark.api.strategy.PagamentoContext;
import com.sark.api.strategy.PagamentoPix;
import com.sark.api.strategy.PagamentoStrategy;

@RestController
@RequestMapping("/api/pagamentos")
public class PagamentoController {

    @PostMapping
    public ResponseEntity<String> realizarPagamento(@RequestParam String metodo, @RequestParam double valor) {
        PagamentoStrategy strategy;

        switch (metodo.toLowerCase()) {
            case "cartao":
                strategy = new PagamentoCartao();
                break;
            case "pix":
                strategy = new PagamentoPix();
                break;
            case "boleto":
                strategy = new PagamentoBoleto();
                break;
            default:
                return ResponseEntity.badRequest().body("Método de pagamento inválido!");
        }

        PagamentoContext context = new PagamentoContext(strategy);
        String resultado = context.processarPagamento(valor);

        return ResponseEntity.ok(resultado);
    }
}
