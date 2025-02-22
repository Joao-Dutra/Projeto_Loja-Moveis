package com.sark.api.controller;

import com.sark.api.model.Pedido;
import com.sark.api.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping("/usuario/{idUsuario}")
    public List<Pedido> listarPedidosPorUsuario(@PathVariable Long idUsuario) {
        return pedidoService.listarPedidosPorUsuario(idUsuario);
    }

    @PostMapping
    public Pedido salvarPedido(@RequestBody Pedido pedido) {
        return pedidoService.salvarPedido(pedido);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Pedido> atualizarStatusPedido(@PathVariable Long id, @RequestParam Pedido.StatusPedido status) {
        Pedido pedido = pedidoService.atualizarStatusPedido(id, status);
        return ResponseEntity.ok(pedido);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPedido(@PathVariable Long id) {
        pedidoService.deletarPedido(id);
        return ResponseEntity.noContent().build();
    }
}
