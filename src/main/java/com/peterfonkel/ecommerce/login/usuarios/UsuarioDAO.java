package com.peterfonkel.ecommerce.login.usuarios;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import com.peterfonkel.ecommerce.login.usuarios.entidades.Usuario;
import java.util.List;
import java.util.Optional;

@RepositoryRestResource(path = "usuarios", itemResourceRel = "usuario", collectionResourceRel = "usuarios")
public interface UsuarioDAO extends JpaRepository<Usuario, Integer> {

	boolean existsByEmail(String email);

	Optional<Usuario> findByEmail(String email);

	<S extends Usuario> S save(Optional<Usuario> usuario2);

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	List<Usuario> findAll();

	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
	Optional<Usuario> findById(Integer id);

	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
	@Override
	boolean existsById(Integer id);

	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
	@Override
	long count();

	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
	@Override
	void deleteById(Integer id);

	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
	@Override
	void delete(Usuario entity);

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@Override
	void deleteAllById(Iterable<? extends Integer> ids);

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@Override
	void deleteAll(Iterable<? extends Usuario> entities);

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@Override
	void deleteAll();

}
