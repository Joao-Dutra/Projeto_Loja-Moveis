package com.sark.api.factory;

import java.time.LocalDateTime;

import com.sark.api.model.Pedido;
import com.sark.api.model.Usuario;

public class PedidoFactory {
    public static Pedido criarPedido(Usuario usuario, double total) {
        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setTotal(total);
        pedido.setStatus(Pedido.StatusPedido.AGUARDANDO_PAGAMENTO);
        pedido.setDataPedido(LocalDateTime.now());
        return pedido;
    }
}

