package com.sark.api.strategy;

public class PagamentoBoleto implements PagamentoStrategy {
    @Override
    public String processarPagamento(double valor) {
        return "Pagamento de R$ " + valor + " gerado com Boleto Bancário.";
    }
}
