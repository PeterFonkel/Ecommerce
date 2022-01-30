package com.peterfonkel.ecommerce.rest.productos;

import java.util.List;

import com.peterfonkel.ecommerce.entities.Producto;

public interface ProductoDAOCustom {

	List<Producto> getProductos();
}
