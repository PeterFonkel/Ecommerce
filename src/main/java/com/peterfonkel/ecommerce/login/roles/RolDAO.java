package com.peterfonkel.ecommerce.login.roles;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.peterfonkel.ecommerce.login.roles.enums.RolNombre;

import java.util.Optional;

@RepositoryRestResource(path = "roles", itemResourceRel = "rol", collectionResourceRel = "roles")
public interface RolDAO extends JpaRepository<Rol, Integer> {

	Optional<Rol> findByRolNombre(RolNombre rolNombre);

	boolean existsByRolNombre(RolNombre rolNombre);
}
