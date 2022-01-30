package com.peterfonkel.ecommerce.login.usuarios;

import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.peterfonkel.ecommerce.login.usuarios.entidades.Usuario;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Builder de usuarios.
 * 
 * Crea un listado de autoridades a partir de los roles del usuario y crea un
 * usuario principal (clase de gestion de la seguridad por roles)
 * 
 * @author albal
 *
 */
public class UsuarioPrincipalFactory {

	public static UsuarioPrincipal build(Usuario usuario) {
		List<GrantedAuthority> authorities = usuario.getRoles().stream()
				.map(rol -> new SimpleGrantedAuthority(rol.getRolNombre().name())).collect(Collectors.toList());
		return new UsuarioPrincipal(usuario.getEmail(), usuario.getPassword(), authorities);
	}
}
