package com.sark.api.strategy;

public class PagamentoCartao implements PagamentoStrategy {
    @Override
    public String processarPagamento(double valor) {
        return "Pagamento de R$ " + valor + " realizado com Cartão de Crédito.";
    }
}
