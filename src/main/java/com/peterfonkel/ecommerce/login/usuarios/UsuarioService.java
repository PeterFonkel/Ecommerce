package com.peterfonkel.ecommerce.login.usuarios;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.peterfonkel.ecommerce.login.usuarios.entidades.Usuario;

import java.util.List;
import java.util.Optional;

/**
 * Servicio de gestion de usuarios en la base de datos
 * 
 * Los metodos de verificacion de usuario en BD son abiertos y el metodo de
 * creacion de usuario es reservado "ADMIN"
 * 
 * @author albal
 *
 */
@Service
@Transactional
public class UsuarioService {

	@Autowired
	UsuarioDAO usuarioDAO;

	public Optional<Usuario> getByEmail(String email) {
		System.out.println("En getByEmail service: " + email);
		return usuarioDAO.findByEmail(email);
	}

	public boolean existsEmail(String email) {
		return usuarioDAO.existsByEmail(email);
	}

	public Usuario save(Usuario usuario) {
		return usuarioDAO.save(usuario);
	}
}
