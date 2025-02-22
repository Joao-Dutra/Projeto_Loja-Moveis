package com.sark.api.adapter;

public class MercadoPagoAPI {
    public String criarPagamento(double valor) {
        return "Pagamento de R$ " + valor + " processado via Mercado Pago.";
    }
}
