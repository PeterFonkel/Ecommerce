package com.peterfonkel.ecommerce.login;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.peterfonkel.ecommerce.login.jwt.JwtProvider;
import com.peterfonkel.ecommerce.login.roles.Rol;
import com.peterfonkel.ecommerce.login.roles.RolService;
import com.peterfonkel.ecommerce.login.usuarios.UsuarioService;
import com.peterfonkel.ecommerce.login.usuarios.entidades.Usuario;

@RepositoryRestController
@RequestMapping("/usuarios/search")
@CrossOrigin
public class UsuariosController {

	@Value("${secretPsw}")
	String secretPsw;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	UsuarioService usuarioService;

	@Autowired
	RolService rolService;

	private final static Logger logger = LoggerFactory.getLogger(JwtProvider.class);

	public String getSecretPsw() {
		return secretPsw;
	}

	public PasswordEncoder getPasswordEncoder() {
		return passwordEncoder;
	}

	public RolService getRolService() {
		return rolService;
	}

	public UsuarioService getUsuarioService() {
		return usuarioService;
	}

	@PostMapping("/nuevousuario")
	private Usuario saveNuevoUsuario(@RequestBody Usuario usuario) {
		System.out.println("USUARIO: " + usuario);
		logger.info("Salvando nuevo Usuario: " + usuario);
		Usuario usuarioNuevo = new Usuario(usuario.getEmail(), getPasswordEncoder().encode(getSecretPsw()),
				usuario.getNombre(), usuario.getTelefono());
		Rol rol = getRolService().getByRolNombre(usuario.getRol().getRolNombre()).get();
		logger.info("Asignando el rol: ", rol);
		usuarioNuevo.getRoles().add(rol);
		return getUsuarioService().save(usuarioNuevo);
	}

	@GetMapping("/getusuariobyemail")
	private Optional<Usuario> findByEmail(@RequestParam String email) {
		System.out.println("En getById controller: " + email);
		return getUsuarioService().getByEmail(email);
	}
}
