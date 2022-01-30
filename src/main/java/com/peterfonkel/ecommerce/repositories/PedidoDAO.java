package com.peterfonkel.ecommerce.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.peterfonkel.ecommerce.entities.Pedido;

@RepositoryRestResource(path = "pedidos", itemResourceRel = "pedido", collectionResourceRel = "pedidos")
public interface PedidoDAO extends JpaRepository<Pedido, Long> {

	void save(Optional<Pedido> pedidoEnApi);

}
