package com.sark.api.service;

import org.springframework.stereotype.Service;

import com.sark.api.adapter.MercadoPagoAdapter;

@Service
public class PagamentoService {

    public String realizarPagamento(double valor) {
        MercadoPagoAdapter adapter = new MercadoPagoAdapter();
        return adapter.processarPagamento(valor);
    }
}
