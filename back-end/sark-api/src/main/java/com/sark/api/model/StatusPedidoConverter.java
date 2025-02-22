package com.sark.api.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class StatusPedidoConverter implements AttributeConverter<Pedido.StatusPedido, String> {

    @Override
    public String convertToDatabaseColumn(Pedido.StatusPedido statusPedido) {
        return statusPedido == null ? null : statusPedido.name().toLowerCase();
    }

    @Override
    public Pedido.StatusPedido convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }
        try {
            return Pedido.StatusPedido.valueOf(dbData.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Status do pedido inválido: " + dbData);
        }
    }
}
