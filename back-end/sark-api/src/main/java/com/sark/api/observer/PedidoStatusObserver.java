package com.sark.api.observer;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.sark.api.model.Pedido;

@Component
public class PedidoStatusObserver {

    @EventListener
    public void onStatusChanged(Pedido pedido) {
        System.out.println("Pedido " + pedido.getId() + " mudou para o status: " + pedido.getStatus());
    }
}
