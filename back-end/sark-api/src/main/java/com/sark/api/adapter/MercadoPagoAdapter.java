package com.sark.api.adapter;

public class MercadoPagoAdapter {

    private MercadoPagoAPI mercadoPagoAPI;

    public MercadoPagoAdapter() {
        this.mercadoPagoAPI = new MercadoPagoAPI();
    }

    public String processarPagamento(double valor) {
        return mercadoPagoAPI.criarPagamento(valor);
    }
}
