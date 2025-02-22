package com.sark.api.controller;

import com.sark.api.model.Envio;
import com.sark.api.service.EnvioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/envios")
public class EnvioController {

    @Autowired
    private EnvioService envioService;

    @PostMapping
    public Envio salvarEnvio(@RequestBody Envio envio) {
        return envioService.salvarEnvio(envio);
    }

    @GetMapping("/pedido/{idPedido}")
    public ResponseEntity<Envio> buscarPorPedido(@PathVariable Long idPedido) {
        return ResponseEntity.ok(envioService.buscarPorPedido(idPedido));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEnvio(@PathVariable Long id) {
        envioService.deletarEnvio(id);
        return ResponseEntity.noContent().build();
    }
}
