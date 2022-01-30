package com.peterfonkel.ecommerce.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import com.peterfonkel.ecommerce.entities.Producto;
import com.peterfonkel.ecommerce.entities.ProductoCarro;

@RepositoryRestResource(path = "productoCarros", itemResourceRel = "productoCarro", collectionResourceRel = "productoCarros")
public interface ProductoCarroDAO extends JpaRepository<ProductoCarro, Long> {

	List<ProductoCarro> findAll();

}
