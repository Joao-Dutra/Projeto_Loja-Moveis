package com.sark.api.factory;

import com.sark.api.model.ItemPedido;
import com.sark.api.model.Pedido;
import com.sark.api.model.VariacaoProduto;

public class ItemPedidoFactory {
    public static ItemPedido criarItemPedido(Pedido pedido, VariacaoProduto variacaoProduto, int quantidade, double precoUnitario) {
        ItemPedido itemPedido = new ItemPedido();
        itemPedido.setPedido(pedido);
        itemPedido.setVariacaoProduto(variacaoProduto);
        itemPedido.setQuantidade(quantidade);
        itemPedido.setPrecoUnitario(precoUnitario);
        return itemPedido;
    }
}

