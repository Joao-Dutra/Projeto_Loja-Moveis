package com.sark.api.strategy;

public class PagamentoContext {
    private PagamentoStrategy pagamentoStrategy;

    public PagamentoContext(PagamentoStrategy pagamentoStrategy) {
        this.pagamentoStrategy = pagamentoStrategy;
    }

    public String processarPagamento(double valor) {
        return pagamentoStrategy.processarPagamento(valor);
    }
}

