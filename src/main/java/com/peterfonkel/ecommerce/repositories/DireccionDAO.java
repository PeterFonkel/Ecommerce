package com.peterfonkel.ecommerce.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.peterfonkel.ecommerce.entities.Direccion;

@RepositoryRestResource(path = "direcciones", itemResourceRel = "direccion", collectionResourceRel = "direcciones")
public interface DireccionDAO extends JpaRepository<Direccion, Long> {

		List<Direccion> findAll();
}
