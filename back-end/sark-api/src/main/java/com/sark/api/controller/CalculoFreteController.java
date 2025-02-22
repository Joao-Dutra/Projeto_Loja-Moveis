package com.sark.api.controller;

import com.sark.api.model.CalculoFrete;
import com.sark.api.service.CalculoFreteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculo-frete")
public class CalculoFreteController {

    @Autowired
    private CalculoFreteService calculoFreteService;

    @PostMapping
    public CalculoFrete salvarCalculoFrete(@RequestBody CalculoFrete calculoFrete) {
        return calculoFreteService.salvarCalculoFrete(calculoFrete);
    }

    @GetMapping("/pedido/{idPedido}")
    public ResponseEntity<CalculoFrete> buscarPorPedido(@PathVariable Long idPedido) {
        return ResponseEntity.ok(calculoFreteService.buscarPorPedido(idPedido));
    }
}
