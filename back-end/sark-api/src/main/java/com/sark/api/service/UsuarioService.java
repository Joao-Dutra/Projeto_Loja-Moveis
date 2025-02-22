package com.sark.api.service;

import com.sark.api.model.Usuario;
import com.sark.api.model.Usuario.TipoUsuario;
import com.sark.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.EnumSet;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario salvarUsuario(Usuario usuario) {
        if (usuario.getTipo() == null) {
            usuario.setTipo(TipoUsuario.CLIENTE); // Padrão para cliente
        } else if (!EnumSet.of(TipoUsuario.CLIENTE, TipoUsuario.ADMIN).contains(usuario.getTipo())) {
            throw new IllegalArgumentException("Tipo de usuário inválido: " + usuario.getTipo());
        }
        return usuarioRepository.save(usuario);
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
    }

    public Usuario atualizarUsuario(Long id, Usuario usuarioAtualizado) {
        Usuario usuario = buscarPorId(id);
        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setEmail(usuarioAtualizado.getEmail());
        usuario.setSenha(usuarioAtualizado.getSenha());
        usuario.setTelefone(usuarioAtualizado.getTelefone());
        usuario.setTipo(usuarioAtualizado.getTipo());
        return usuarioRepository.save(usuario);
    }

    public void deletarUsuario(Long id) {
        Usuario usuario = buscarPorId(id);
        usuarioRepository.delete(usuario);
    }
}
