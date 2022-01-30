package com.peterfonkel.ecommerce.rest.productos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.peterfonkel.ecommerce.entities.Producto;
import com.peterfonkel.ecommerce.repositories.ProductoDAO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional
public class ProductoDAOImpl implements ProductoDAOCustom {

	@Autowired
	ProductoDAO productoDAO;

	@Override
	public List<Producto> getProductos() {
		return this.productoDAO.findAll();
	}

}
