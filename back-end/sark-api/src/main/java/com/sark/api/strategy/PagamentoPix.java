package com.sark.api.strategy;

public class PagamentoPix implements PagamentoStrategy {
    @Override
    public String processarPagamento(double valor) {
        return "Pagamento de R$ " + valor + " realizado via Pix.";
    }
}
