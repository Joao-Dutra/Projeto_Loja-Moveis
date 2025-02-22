package com.sark.api.controller;

import com.sark.api.model.ItemPedido;
import com.sark.api.service.ItemPedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/itens-pedido")
public class ItemPedidoController {

    @Autowired
    private ItemPedidoService itemPedidoService;

    @GetMapping("/pedido/{idPedido}")
    public List<ItemPedido> listarItensPorPedido(@PathVariable Long idPedido) {
        return itemPedidoService.listarItensPorPedido(idPedido);
    }

    @PostMapping
    public ItemPedido salvarItemPedido(@RequestBody ItemPedido itemPedido) {
        return itemPedidoService.salvarItemPedido(itemPedido);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarItemPedido(@PathVariable Long id) {
        itemPedidoService.deletarItemPedido(id);
        return ResponseEntity.noContent().build();
    }
}
