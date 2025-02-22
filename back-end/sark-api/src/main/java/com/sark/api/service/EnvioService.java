package com.sark.api.service;

import com.sark.api.model.Envio;
import com.sark.api.repository.EnvioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnvioService {

    @Autowired
    private EnvioRepository envioRepository;

    public Envio salvarEnvio(Envio envio) {
        return envioRepository.save(envio);
    }

    public Envio buscarPorPedido(Long idPedido) {
        return envioRepository.findByPedidoId(idPedido)
            .orElseThrow(() -> new RuntimeException("Envio não encontrado para o pedido: " + idPedido));
    }

    public void deletarEnvio(Long id) {
        envioRepository.deleteById(id);
    }
}
