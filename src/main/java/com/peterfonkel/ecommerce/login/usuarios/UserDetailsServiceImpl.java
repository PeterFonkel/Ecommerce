package com.peterfonkel.ecommerce.login.usuarios;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.peterfonkel.ecommerce.login.usuarios.entidades.Usuario;

/**
 * Servicio de carga de un usuario por su email
 * 
 * @author albal
 *
 */
@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	UsuarioService usuarioService;

	/**
	 * Carga usuario a partir de su mail
	 */
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Usuario usuario = usuarioService.getByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("email no encontrado"));
		return UsuarioPrincipalFactory.build(usuario);
	}
}
