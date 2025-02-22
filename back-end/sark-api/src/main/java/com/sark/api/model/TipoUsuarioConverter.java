package com.sark.api.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TipoUsuarioConverter implements AttributeConverter<Usuario.TipoUsuario, String> {

    @Override
    public String convertToDatabaseColumn(Usuario.TipoUsuario tipoUsuario) {
        return tipoUsuario == null ? null : tipoUsuario.name().toLowerCase();
    }

    @Override
    public Usuario.TipoUsuario convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }
        try {
            return Usuario.TipoUsuario.valueOf(dbData.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Tipo de usuário inválido: " + dbData);
        }
    }
}
