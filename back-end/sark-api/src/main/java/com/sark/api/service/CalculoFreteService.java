package com.sark.api.service;

import com.sark.api.model.CalculoFrete;
import com.sark.api.repository.CalculoFreteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CalculoFreteService {

    @Autowired
    private CalculoFreteRepository calculoFreteRepository;

    public CalculoFrete salvarCalculoFrete(CalculoFrete calculoFrete) {
        return calculoFreteRepository.save(calculoFrete);
    }

    public CalculoFrete buscarPorPedido(Long idPedido) {
        return calculoFreteRepository.findById(idPedido)
            .orElseThrow(() -> new RuntimeException("Cálculo de frete não encontrado para o pedido: " + idPedido));
    }
}
